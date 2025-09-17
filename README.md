# BMSSP / SSSP Monorepo

[![🇺🇸 English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![🇰🇷 한국어](https://img.shields.io/badge/lang-한국어-red)](./README.ko.md)

This repository is a **monorepo** that contains the Shortest / Bounded Multiple Source Shortest Path (BMSSP / SSSP) SDK and related applications.

- **SDK (`@jeremy-kr/sssp-sdk`)**: A reusable TypeScript SDK for shortest path algorithms. It currently ships with a Dijkstra implementation using a binary heap (O((n+m) log n)), and is designed to evolve toward BMSSP/SSSP.
- **Apps**: Planned demos and a benchmarking website to compare performance across languages (TypeScript, Rust, Go, etc.).

## Why this project?

Shortest-path computation is fundamental—routing, dependency resolution, scheduling, graph analytics, and more.  
This project aims to provide:

- A clean, modern SDK for TypeScript/JavaScript projects
- A playground for new research ideas such as BMSSP
- Cross-language benchmarks that are easy to reproduce

## Repository structure

```
apps/                # Example apps and benchmarks (planned)
packages/
  sssp-sdk/          # Core SDK package
turbo.json           # Turborepo config
package.json         # Workspace root
LICENSE              # Apache-2.0
```

## Installation

```bash
bun add @jeremy-kr/sssp-sdk
# or
npm install @jeremy-kr/sssp-sdk
```

## Usage example

```ts
import { AdjListGraph, sssp } from "@jeremy-kr/sssp-sdk";

const g = new AdjListGraph([[[1, 1]], [[2, 2]], []]);

const { dist } = await sssp(0, g);
console.log(Object.fromEntries(dist)); // { '0': 0, '1': 1, '2': 3 }
```

## Design goals

- **Simple API surface**: `AdjListGraph`, `dijkstra`, `sssp`
- **Performance-minded**: binary-heap implementation today; room for specialized queues later
- **Extensible**: multiple graph backends (array- and map-based adjacency), NodeId as `number|string`

## Roadmap

- [ ] Replace the SSSP placeholder with a first BMSSP implementation
- [ ] Benchmark site (inputs, presets, CSV export, charts)
- [ ] More graph structures (CSR-like, typed arrays)
- [ ] Docs site with API reference & guides

## Contributing

Issues and PRs are welcome. Please include motivation, design notes, and tests.

## License

Licensed under the [Apache License 2.0](./LICENSE).
