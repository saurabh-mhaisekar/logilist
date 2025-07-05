<script lang="ts">
  import type ItemInterface from "$lib/interfaces/ItemInterface";
  import { updateItem } from "$lib/util/local_db_ops";
  import { onMount } from "svelte";

  export let item: ItemInterface;
  export let onPressEnter: () => void;
  export let isNew = false;

  let inputElement: HTMLInputElement;
  let updateTimeout: NodeJS.Timeout;

  onMount(() => {
    if (isNew) {
      inputElement.focus();
    }
  });

  const handleInput = () => {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateItem(item);
    }, 1000);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "Enter") {
      inputElement.blur();
      if (item.status === "active") {
        item.status = "completed";
      } else {
        item.status = "active";
      }
    } else if (e.key === "Enter" && e.ctrlKey) {
      onPressEnter();
    }
  };
</script>

<div class="flex w-full justify-between">
  <input
    type="text"
    class="mr-2 border-0 focus:border-0 focus:outline-none active:border-0 w-full {item.status ===
    'completed'
      ? 'line-through text-gray-500'
      : ''}"
    bind:value={item.description}
    bind:this={inputElement}
    onkeydown={handleKeyDown}
    oninput={handleInput}
  />
</div>
