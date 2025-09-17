# BMSSP / SSSP 모노레포

[![🇺🇸 English](https://img.shields.io/badge/lang-English-blue)](./README.md)
[![🇰🇷 한국어](https://img.shields.io/badge/lang-한국어-red)](./README.ko.md)

이 저장소는 **Shortest / Bounded Multiple Source Shortest Path (BMSSP / SSSP) SDK**와 관련 애플리케이션을 담고 있는 모노레포예요.

- **SDK (`@jeremy-kr/sssp-sdk`)**: 재사용 가능한 TypeScript 기반 최단 경로 SDK예요. 지금은 이진 힙을 사용하는 Dijkstra 구현(O((n+m) log n))을 제공하고 있고, 앞으로 BMSSP/SSSP로 확장할 예정이에요.
- **앱**: 다양한 언어(TypeScript, Rust, Go 등)에서 성능을 비교할 수 있는 데모와 벤치마크 웹사이트를 만들 계획이에요.

## 왜 이 프로젝트를 하나요?

최단 경로 계산은 지도 경로 탐색, 의존성 해석, 스케줄링, 그래프 분석 등 정말 많은 곳에서 핵심이에요.  
이 프로젝트는 다음을 목표로 해요:

- 어디서든 쉽게 쓸 수 있는 현대적인 TypeScript/JavaScript SDK
- BMSSP 같은 새로운 연구 아이디어를 실험할 수 있는 놀이터
- 언어별/런타임별로 재현 가능한 벤치마크

## 저장소 구조

```
apps/                # 예제 앱과 벤치마크 (계획)
packages/
  sssp-sdk/          # 핵심 SDK 패키지
turbo.json           # Turborepo 설정
package.json         # 루트 워크스페이스
LICENSE              # Apache-2.0
```

## 설치

```bash
bun add @jeremy-kr/sssp-sdk
# 또는
npm install @jeremy-kr/sssp-sdk
```

## 사용 예시

```ts
import { AdjListGraph, sssp } from "@jeremy-kr/sssp-sdk";

const g = new AdjListGraph([[[1, 1]], [[2, 2]], []]);

const { dist } = await sssp(0, g);
console.log(Object.fromEntries(dist)); // { '0': 0, '1': 1, '2': 3 }
```

## 설계 목표

- **간단한 API**: `AdjListGraph`, `dijkstra`, `sssp`
- **성능 고려**: 현재는 바이너리 힙, 추후 특화 큐로 교체 여지
- **확장성**: 다양한 그래프 백엔드(배열/맵), `number|string` 노드 ID

## 로드맵

- [ ] SSSP 자리 채우기 → BMSSP 첫 구현
- [ ] 벤치마크 웹사이트(입력 프리셋, CSV 내보내기, 차트)
- [ ] 더 많은 그래프 구조(CSR 유사, TypedArray)
- [ ] 문서 사이트(API 레퍼런스 & 가이드)

## 기여하기

이슈와 PR을 환영해요. 변경 의도, 설계 노트, 테스트를 함께 남겨주세요.

## 라이선스

[Apache License 2.0](./LICENSE) 하에 배포돼요.
