import { describe, it, expect } from "vitest";
import { AdjListGraph } from "./graph";
import { dijkstra, sssp } from "./index";

describe("public API - numeric ids", () => {
  it("dijkstra computes shortest paths on a simple chain", () => {
    const g = new AdjListGraph([
      [[1, 1]], // 0 -> 1 (1)
      [[2, 2]], // 1 -> 2 (2)
      [],
    ]);

    const { dist, parent } = dijkstra(0, g);
    expect(dist.get(0)).toBe(0);
    expect(dist.get(1)).toBe(1);
    expect(dist.get(2)).toBe(3);
    expect(parent.get(1)).toBe(0);
    expect(parent.get(2)).toBe(1);
  });

  it("sssp proxies to dijkstra (same result)", async () => {
    const g = new AdjListGraph([
      [
        [1, 1],
        [2, 5],
      ],
      [[2, 1]],
      [[3, 1]],
      [],
    ]);

    const d = dijkstra(0, g);
    const s = await sssp(0, g);
    expect(Object.fromEntries(d.dist)).toEqual(Object.fromEntries(s.dist));
  });
});
