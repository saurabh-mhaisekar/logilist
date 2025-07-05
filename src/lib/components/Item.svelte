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
</script>

<div class="flex w-full justify-between">
  <input
    type="text"
    class="mr-2 border-0 focus:border-0 focus:outline-none active:border-0 w-full"
    bind:value={item.description}
    bind:this={inputElement}
    onkeydown={(e) => {
      if (e.key === "Enter") {
        onPressEnter();
      }
    }}
    oninput={() => {
      clearTimeout(updateTimeout);
      updateTimeout = setTimeout(() => {
        updateItem(item);
      }, 1000);
    }}
  />
</div>
