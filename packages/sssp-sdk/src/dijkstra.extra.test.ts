import { describe, it, expect } from "vitest";
import { AdjListGraph } from "./graph";
import { dijkstra, sssp } from "./index";

/**
 * 1) Diamond graph with tie distances:
 *    0 -> 1 (1), 0 -> 2 (1), 1 -> 3 (1), 2 -> 3 (1)
 *    dist(3) = 2, parent(3) can be either 1 or 2.
 */
describe("dijkstra - ties and diamonds", () => {
  it("handles multiple equal shortest paths (diamond)", () => {
    const g = new AdjListGraph([
      [
        [1, 1],
        [2, 1],
      ], // 0
      [[3, 1]], // 1
      [[3, 1]], // 2
      [], // 3
    ]);

    const { dist, parent } = dijkstra(0, g);
    expect(dist.get(0)).toBe(0);
    expect(dist.get(1)).toBe(1);
    expect(dist.get(2)).toBe(1);
    expect(dist.get(3)).toBe(2);
    expect([1, 2]).toContain(parent.get(3));
  });
});

/**
 * 2) Zero-weight edges:
 *    0 -> 1 (0) -> 2 (0) -> 3 (5)
 */
describe("dijkstra - zero-weight edges", () => {
  it("supports zero-weight edges", () => {
    const g = new AdjListGraph([
      [[1, 0]], // 0
      [[2, 0]], // 1
      [[3, 5]], // 2
      [],
    ]);
    const { dist } = dijkstra(0, g);
    expect(dist.get(0)).toBe(0);
    expect(dist.get(1)).toBe(0);
    expect(dist.get(2)).toBe(0);
    expect(dist.get(3)).toBe(5);
  });
});

/**
 * 3) Parallel edges: 0 -> 1 (10) and 0 -> 1 (2)
 */
describe("dijkstra - parallel edges", () => {
  it("picks the cheaper among parallel edges", () => {
    const g = new AdjListGraph([
      [
        [1, 10],
        [1, 2],
      ], // 0
      [],
    ]);
    const { dist } = dijkstra(0, g);
    expect(dist.get(1)).toBe(2);
  });
});

/**
 * 4) Star graph: 0 is the hub, dist(i) = i
 */
describe("dijkstra - star graph", () => {
  it("handles star graph efficiently", () => {
    const n = 20;
    const adj: Array<Array<[number, number]>> = Array.from(
      { length: n },
      () => []
    );
    for (let i = 1; i < n; i++) {
      adj[0].push([i, i]); // 0 -> i (i)
      adj[i].push([0, i]); // i -> 0 (i)
    }
    const g = new AdjListGraph(adj);
    const { dist } = dijkstra(0, g);
    for (let i = 0; i < n; i++) {
      expect(dist.get(i)).toBe(i === 0 ? 0 : i);
    }
  });
});

/**
 * 5) Long chain sanity (stress-lite):
 *    0 -> 1 -> 2 -> ... -> (L-1), compare with prefix sums.
 */
describe("dijkstra - long chain sanity (stress-lite)", () => {
  it("matches prefix sums on a long chain", () => {
    const L = 1000;
    const weights = Array.from({ length: L - 1 }, () =>
      Math.floor(Math.random() * 10)
    );
    const adj: Array<Array<[number, number]>> = Array.from(
      { length: L },
      () => []
    );
    for (let i = 0; i < L - 1; i++) adj[i].push([i + 1, weights[i]]);
    const expected: number[] = new Array(L).fill(0);
    for (let i = 1; i < L; i++) expected[i] = expected[i - 1] + weights[i - 1];

    const g = new AdjListGraph(adj);
    const { dist } = dijkstra(0, g);
    for (let i = 0; i < L; i++) expect(dist.get(i)).toBe(expected[i]);
  });
});

/**
 * 6) Consistency with sssp on a mixed graph
 */
describe("sssp - consistency on mixed graph", () => {
  it("returns same distances as dijkstra", async () => {
    const g = new AdjListGraph([
      [
        [1, 1],
        [2, 2],
        [3, 10],
      ],
      [
        [2, 1],
        [3, 4],
      ],
      [[3, 1]],
      [],
    ]);
    const d = dijkstra(0, g);
    const s = await sssp(0, g);
    expect(Object.fromEntries(d.dist)).toEqual(Object.fromEntries(s.dist));
  });
});

/**
 * 7) String node ids: supports non-numeric node identifiers.
 */
describe("dijkstra - string node ids", () => {
  it("handles string-labeled nodes", () => {
    const g = new AdjListGraph(
      new Map<string, ReadonlyArray<[string, number]>>([
        ["A", [["B", 1]]],
        ["B", [["C", 2]]],
        ["C", []],
      ])
    );
    const { dist, parent } = dijkstra("A", g);
    expect(dist.get("A")).toBe(0);
    expect(dist.get("B")).toBe(1);
    expect(dist.get("C")).toBe(3);
    expect(parent.get("B")).toBe("A");
    expect(parent.get("C")).toBe("B");
  });
});

/**
 * 8) Negative weight guard
 */
describe("dijkstra - negative weight rejection", () => {
  it("throws when encountering a negative-weight edge", () => {
    const g = new AdjListGraph([[[1, -1]], []]);
    expect(() => dijkstra(0, g)).toThrow(/non-negative/i);
  });
});
