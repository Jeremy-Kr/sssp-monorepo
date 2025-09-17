import type { Graph, NodeId } from "./types";

/** runtime guard for Map-like (covers ReadonlyMap as well) */
function isMapLike<K, V>(x: unknown): x is ReadonlyMap<K, V> {
  return (
    !!x &&
    typeof (x as any).get === "function" &&
    typeof (x as any).keys === "function"
  );
}

/**
 * Adjacency list graph supporting:
 *  - array-based adjacency: ReadonlyArray<ReadonlyArray<[number, number]>>
 *  - map-based adjacency keyed by NodeId: ReadonlyMap<NodeId, ReadonlyArray<[NodeId, number]>>
 *
 * Array mode ⇒ node ids are 0..n-1
 * Map mode   ⇒ node ids are the Map's keys
 */
export class AdjListGraph implements Graph {
  private readonly isArray: boolean;
  private readonly arrAdj?: ReadonlyArray<ReadonlyArray<[number, number]>>;
  private readonly mapAdj?: ReadonlyMap<
    NodeId,
    ReadonlyArray<[NodeId, number]>
  >;
  private readonly nodeIds: NodeId[];

  constructor(
    nodeCountOrAdj:
      | number
      | ReadonlyArray<ReadonlyArray<[number, number]>>
      | ReadonlyMap<NodeId, ReadonlyArray<[NodeId, number]>>
  ) {
    if (typeof nodeCountOrAdj === "number") {
      const n = nodeCountOrAdj;
      this.isArray = true;
      this.arrAdj = Array.from({ length: n }, () => []);
      this.nodeIds = Array.from({ length: n }, (_, i) => i);
    } else if (Array.isArray(nodeCountOrAdj)) {
      this.isArray = true;
      this.arrAdj = nodeCountOrAdj;
      this.nodeIds = Array.from({ length: nodeCountOrAdj.length }, (_, i) => i);
    } else if (
      isMapLike<NodeId, ReadonlyArray<[NodeId, number]>>(nodeCountOrAdj)
    ) {
      this.isArray = false;
      this.mapAdj = nodeCountOrAdj;
      this.nodeIds = Array.from(nodeCountOrAdj.keys());
    } else {
      throw new Error("Invalid graph constructor argument");
    }
  }

  get nodeCount(): number {
    return this.nodeIds.length;
  }

  nodes(): Iterable<NodeId> {
    return this.nodeIds.values();
  }

  out(u: NodeId): Iterable<[NodeId, number]> {
    if (this.isArray) {
      // accept number or numeric string as index
      let idx: number;
      if (typeof u === "number") idx = u;
      else if (typeof u === "string" && /^[0-9]+$/.test(u)) idx = Number(u);
      else
        throw new Error(
          "AdjListGraph(array): node id must be a number (or numeric string)"
        );
      return this.arrAdj![idx] ?? [];
    }
    // map mode
    return this.mapAdj!.get(u) ?? [];
  }

  /** Convenience helper for array-based graphs */
  addEdge(from: number, to: number, weight: number) {
    if (!this.isArray) {
      throw new Error(
        "addEdge(number, number, number) is only available in array-based mode"
      );
    }
    // arrAdj is typed readonly; cast to mutable view for construction convenience
    (this.arrAdj as Array<Array<[number, number]>>)[from].push([to, weight]);
  }

  /** Convenience helper for map-based graphs */
  addEdgeById(from: NodeId, to: NodeId, weight: number) {
    if (this.isArray) {
      throw new Error("addEdgeById is only available in map-based mode");
    }
    const m = this.mapAdj as
      | Map<NodeId, Array<[NodeId, number]>>
      | ReadonlyMap<NodeId, ReadonlyArray<[NodeId, number]>>;
    if (!(m instanceof Map)) {
      throw new Error(
        "addEdgeById requires a mutable Map at construction time"
      );
    }
    const arr = (m.get(from) as Array<[NodeId, number]>) ?? [];
    arr.push([to, weight]);
    m.set(from, arr);
    if (!this.nodeIds.includes(from)) (this.nodeIds as NodeId[]).push(from);
    if (!this.nodeIds.includes(to)) (this.nodeIds as NodeId[]).push(to);
  }
}
