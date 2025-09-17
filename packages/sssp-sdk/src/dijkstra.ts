import type { Graph, NodeId } from "./types";
import { MinHeap } from "./min-heap";

/**
 * Dijkstra (non-negative weights) with a binary heap.
 * Works with number or string NodeId.
 * Returns distances and parents for path reconstruction.
 */
export function dijkstra(source: NodeId, g: Graph) {
  const INF = Number.POSITIVE_INFINITY;

  const dist = new Map<NodeId, number>();
  const parent = new Map<NodeId, NodeId | null>();
  for (const id of g.nodes()) {
    dist.set(id, INF);
    parent.set(id, null);
  }
  if (!dist.has(source)) {
    throw new Error("source is not present in graph.nodes()");
  }
  dist.set(source, 0);

  const pq = new MinHeap<[number, NodeId]>();
  pq.push([0, source]);

  while (pq.size) {
    const popped = pq.pop();
    if (!popped) break;
    const [du, u] = popped;

    if (du !== (dist.get(u) ?? INF)) continue;

    for (const [v, w] of g.out(u)) {
      if (w < 0) throw new Error("Dijkstra requires non-negative edge weights");
      const nd = du + w;
      if (nd < (dist.get(v) ?? INF)) {
        dist.set(v, nd);
        parent.set(v, u);
        pq.push([nd, v]);
      }
    }
  }

  return { dist, parent };
}
