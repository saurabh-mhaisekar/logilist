import type NodeInterface from "$lib/interfaces/NodeInterface";
import { writable } from "svelte/store";

export const nodesStore = writable<NodeInterface[]>([]);

export function addNode() {
  const id = crypto.randomUUID();
  const newNode: NodeInterface = { id, title: "", status: "active" };
  nodesStore.update((nodes) => [...nodes, newNode]);
  return id;
}

export function deleteNode(id: string) {
  nodesStore.update((nodes) => nodes.filter((node) => node.id !== id));
}

export function updateNode(id: string, node: NodeInterface) {
  nodesStore.update((nodes) =>
    nodes.map((n) => (n.id === id ? { ...n, ...node } : n))
  );
}
