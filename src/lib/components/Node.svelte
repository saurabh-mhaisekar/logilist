<script lang="ts">
  let { title, id } = $props();
  import { updateNode, addNode, deleteNode } from "$lib/stores/nodesStore";

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      updateNode(id, title);
      addNode();
      // @ts-ignore
      e.target.blur();
    }
    if (e.ctrlKey && e.shiftKey && e.key === "Backspace") {
      deleteNode(id);
    }
  }
</script>

<div class="w-full hover:bg-gray-100">
  <input
    type="text"
    bind:value={title}
    class="w-full border-none focus:outline-none focus:bg-gray-100 hover:bg-gray-100"
    onblur={() => updateNode(id, title)}
    onkeydown={handleKeyDown}
  />
</div>
