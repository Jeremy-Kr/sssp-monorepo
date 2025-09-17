# @jeremy-kr/sssp-sdk

[![🇺🇸 English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![🇰🇷 한국어](https://img.shields.io/badge/lang-한국어-red)](./README.ko.md)

단일 시작점 최단 경로(SSSP) 알고리즘을 위한 TypeScript SDK예요.  
현재는 이진 힙을 사용하는 Dijkstra 구현을 제공하고 있고, 앞으로 BMSSP를 추가할 예정이에요.

## 설치

```bash
bun add @jeremy-kr/sssp-sdk
# 또는
npm install @jeremy-kr/sssp-sdk
```

## 빠른 시작

```ts
import { AdjListGraph, sssp } from "@jeremy-kr/sssp-sdk";

const g = new AdjListGraph([[[1, 1]], [[2, 2]], []]);

const { dist, parent } = await sssp(0, g);
console.log(Object.fromEntries(dist));
```

## API 개요

### 타입

- `NodeId = number | string`
- `Graph`: `{ nodeCount: number; nodes(): Iterable<NodeId>; out(u: NodeId): Iterable<[NodeId, number]> }`

### 그래프

- `AdjListGraph(adj: Array<Array<[number, number]>> | Map<NodeId, Array<[NodeId, number]>>)`  
  배열 기반(숫자 ID) 또는 맵 기반(문자열/숫자 ID)을 지원해요.  
  선택 헬퍼: `addEdge(from: number, to: number, w: number)` (배열 모드).

### 알고리즘

- `dijkstra(source: NodeId, g: Graph)` → `{ dist: Map<NodeId, number>, parent: Map<NodeId, NodeId|null> }`
- `sssp(source: NodeId, g: Graph)` → 현재는 `dijkstra`와 동일해요(향후 BMSSP로 전환 예정).

## 참고

- Dijkstra에서는 간선 가중치가 **음수가 아니어야** 해요.
- 대규모 그래프에서는 배열 기반 인접 리스트가 오버헤드가 적어서 유리해요.

## 라이선스

[Apache License 2.0](../../LICENSE) 하에 배포돼요.
