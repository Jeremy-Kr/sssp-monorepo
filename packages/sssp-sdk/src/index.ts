/**
 * Apache License 2.0
 * Copyright 2025 sssp-sdk contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export * from "./types";
export { AdjListGraph } from "./graph";
export { dijkstra } from "./dijkstra";

import type { Graph, NodeId } from "./types";
import { dijkstra as _dijkstra } from "./dijkstra";

/**
 * Single-source shortest path (SSSP) entry point.
 * Currently uses Dijkstra as a placeholder.
 * TODO: Replace with BMSSP/SSSP implementation.
 */
export async function sssp(source: NodeId, g: Graph) {
  return _dijkstra(source, g);
}
