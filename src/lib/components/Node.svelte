<script lang="ts">
  let { title, id, isNew = false } = $props();
  import { updateNode, addNode, deleteNode } from "$lib/stores/nodesStore";
  import { onMount } from "svelte";

  let inputElement: HTMLInputElement;
  let isDeleting = $state(false);

  onMount(() => {
    if (isNew) {
      inputElement.focus();
    }
  });

  async function handleDelete() {
    isDeleting = true;
    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 500));
    deleteNode(id);
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      updateNode(id, title);
      addNode();
      // @ts-ignore
      e.target.blur();
      return;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "Backspace") {
      e.preventDefault();
      handleDelete();
      return;
    }

    if (e.key === "Backspace") {
      if (title.length === 0) {
        handleDelete();
      }
      return;
    }

    if (e.ctrlKey && e.key === "Enter") {
      // update the node with status completed
    }
  }
</script>

<div
  class="w-full hover:bg-gray-100 animate-fade-in-up"
  class:animate-delete={isDeleting}
>
  <input
    type="text"
    bind:value={title}
    bind:this={inputElement}
    class="w-full border-none focus:outline-none focus:bg-gray-100 hover:bg-gray-100"
    class:font-bold={isDeleting}
    class:text-red-500={isDeleting}
    onblur={() => updateNode(id, title)}
    onkeydown={handleKeyDown}
    {id}
  />
</div>

<style>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes delete {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
  }

  .animate-delete {
    animation: delete 0.5s ease-out forwards;
  }
</style>
