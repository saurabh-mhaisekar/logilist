<script lang="ts">
  import appStore from "$lib/appStore.svelte";
  import type ItemInterface from "$lib/interfaces/ItemInterface";
  import { deleteItem, updateItem } from "$lib/util/local_db_ops";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  export let item: ItemInterface;
  export let onPressEnter: (
    insertAfterIndex: number,
    parentItem: ItemInterface,
  ) => void;
  export let isNew = false;

  let inputElement: HTMLInputElement;
  let updateTimeout: NodeJS.Timeout;
  let isDeleting = false;

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

  const handleIndent = () => {
    const currentIndex = appStore.items.findIndex((i) => i.id === item.id);
    if (currentIndex > 0) {
      const previousItem = appStore.items[currentIndex - 1];

      // Can only indent if previous item is at same or higher level
      if (previousItem.level >= item.level) {
        item.level = previousItem.level + 1;
        item.parentId = previousItem.id;
        updateItem(item);
      }
    }
  };

  const handleOutdent = () => {
    if (item.level > 0) {
      item.level = Math.max(0, item.level - 1);
      // Find the new parent by looking for the closest item at level - 1
      const currentIndex = appStore.items.findIndex((i) => i.id === item.id);
      for (let i = currentIndex - 1; i >= 0; i--) {
        if (appStore.items[i].level === item.level) {
          item.parentId = appStore.items[i].id;
          break;
        } else if (appStore.items[i].level < item.level) {
          item.parentId = appStore.items[i].id;
          break;
        }
      }
      if (item.level === 0) {
        item.parentId = undefined;
      }
      updateItem(item);
    }
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.shiftKey) {
        handleOutdent();
      } else {
        handleIndent();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const currentIndex = appStore.items.findIndex((i) => i.id === item.id);
      if (currentIndex > 0) {
        const prevItem = appStore.items[currentIndex - 1];
        const prevInput = document.querySelector(
          `[data-item-id="${prevItem.id}"]`,
        ) as HTMLInputElement;
        if (prevInput) {
          prevInput.focus();
          prevInput.setSelectionRange(
            prevInput.value.length,
            prevInput.value.length,
          );
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = appStore.items.findIndex((i) => i.id === item.id);
      if (currentIndex < appStore.items.length - 1) {
        const nextItem = appStore.items[currentIndex + 1];
        const nextInput = document.querySelector(
          `[data-item-id="${nextItem.id}"]`,
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(0, 0);
        }
      }
    } else if (e.ctrlKey && e.key === "Enter") {
      if (item.status === "active") {
        item.status = "completed";
      } else {
        item.status = "active";
      }
    } else if (e.key === "Enter") {
      onPressEnter(
        appStore.items.findIndex((i) => i.id === item.id),
        item,
      );
    } else if (e.key === "Backspace") {
      if (item.description.length === 0) {
        isDeleting = true;
        await deleteItem(item);
        // Wait for animation to complete
        setTimeout(() => {
          appStore.items = appStore.items.filter((i) => i.id !== item.id);
        }, 300);
      }
    }
  };
</script>

<div
  class="flex w-full justify-between transition-all duration-300 ease-in-out"
  class:opacity-50={isDeleting}
  class:transform={isDeleting}
  class:scale-95={isDeleting}
  class:translate-x-4={isDeleting}
  in:slide={{ duration: 300, delay: isNew ? 100 : 0 }}
  out:slide={{ duration: 300 }}
>
  <div class="flex w-full items-center">
    <div class="flex-shrink-0" style="margin-left: {item.level * 20}px;">
      <span class="text-gray-400 mr-2">•</span>
    </div>
    <input
      type="text"
      class="border-0 focus:border-0 focus:outline-none active:border-0 w-full transition-all duration-200 {item.status ===
      'completed'
        ? 'line-through text-gray-500'
        : ''}"
      bind:value={item.description}
      bind:this={inputElement}
      data-item-id={item.id}
      onkeydown={handleKeyDown}
      oninput={handleInput}
    />
  </div>
</div>
