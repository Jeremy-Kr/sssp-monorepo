# @jeremy-kr/sssp-sdk

[![🇺🇸 English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![🇰🇷 한국어](https://img.shields.io/badge/lang-한국어-red)](./README.ko.md)

A TypeScript SDK for single-source shortest path (SSSP) algorithms.  
Currently includes a Dijkstra implementation with a binary heap; future versions will add BMSSP.

## Installation

```bash
bun add @jeremy-kr/sssp-sdk
# or
npm install @jeremy-kr/sssp-sdk
```

## Quick start

```ts
import { AdjListGraph, sssp } from "@jeremy-kr/sssp-sdk";

const g = new AdjListGraph([[[1, 1]], [[2, 2]], []]);

const { dist, parent } = await sssp(0, g);
console.log(Object.fromEntries(dist));
```

## API Overview

### Types

- `NodeId = number | string`
- `Graph`: `{ nodeCount: number; nodes(): Iterable<NodeId>; out(u: NodeId): Iterable<[NodeId, number]> }`

### Graph

- `AdjListGraph(adj: Array<Array<[number, number]>> | Map<NodeId, Array<[NodeId, number]>>)`  
  Array-based (numeric ids) or Map-based (string/number ids).  
  Optional helpers: `addEdge(from: number, to: number, w: number)` (array mode).

### Algorithms

- `dijkstra(source: NodeId, g: Graph)` → `{ dist: Map<NodeId, number>, parent: Map<NodeId, NodeId|null> }`
- `sssp(source: NodeId, g: Graph)` → same as `dijkstra` (will switch to BMSSP later).

## Notes

- Edge weights must be **non-negative** for Dijkstra.
- For large graphs, prefer array-based adjacency for minimal overhead.

## License

Licensed under the [Apache License 2.0](../../LICENSE).
