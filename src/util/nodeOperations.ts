import type NodeInterface from "$lib/interfaces/NodeInterface";

function addNode(nodes: NodeInterface[], title: string) {
  nodes.push({ id: nodes.length + 1, title });
}

export { addNode };
