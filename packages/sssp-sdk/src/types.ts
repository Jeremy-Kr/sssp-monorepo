export type NodeId = number | string;

/**
 * Graph interface
 * - nodeCount: number of nodes
 * - nodes(): iterable list of all node ids (numbers or strings)
 * - out(u): iterable list of outgoing edges from node u, as [v, weight]
 */
export interface Graph {
  readonly nodeCount: number;
  nodes(): Iterable<NodeId>;
  out(u: NodeId): Iterable<[NodeId, number]>; // weight >= 0
}
