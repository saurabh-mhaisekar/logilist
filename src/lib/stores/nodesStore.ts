import type NodeInterface from "$lib/interfaces/NodeInterface";
import { writable } from "svelte/store";

export const nodesStore = writable<NodeInterface[]>([]);

export function addNode() {
  // generate guid
  const id = crypto.randomUUID();
  const newNode: NodeInterface = { id, title: "" };
  nodesStore.update((nodes) => [...nodes, newNode]);
}

export function deleteNode(id: string) {
  nodesStore.update((nodes) => nodes.filter((node) => node.id !== id));
}

export function updateNode(id: string, title: string) {
  nodesStore.update((nodes) =>
    nodes.map((node) => (node.id === id ? { ...node, title } : node))
  );
}
