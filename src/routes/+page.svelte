<script lang="ts">
  import appStore from "$lib/appStore.svelte";
  import PlusIcon from "$lib/components/icons/PlusIcon.svelte";
  import Item from "$lib/components/Item.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import type ItemInterface from "$lib/interfaces/ItemInterface";
  import { getItems, insertItem } from "$lib/util/local_db_ops";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  // Variables
  let title = $state("");

  const addItem = (insertAfterIndex?: number, parentItem?: ItemInterface) => {
    const id = crypto.randomUUID();
    const newItem: ItemInterface = {
      id,
      description: "",
      status: "active",
      level: parentItem ? parentItem.level : 0,
      parentId: parentItem ? parentItem.parentId : undefined,
    };

    if (insertAfterIndex !== undefined) {
      // Insert after the specified index
      appStore.items.splice(insertAfterIndex + 1, 0, newItem);
    } else {
      // Add to the end (for the plus button)
      appStore.items.push(newItem);
    }

    appStore.lastAddedItemId = id;
    insertItem(newItem);
    return id;
  };

  onMount(() => {
    getItems().then((dbItems: ItemInterface[]) => {
      dbItems.forEach((item) => {
        appStore.items.push(item);
      });
    });
    appStore.isLoading = false;
  });
</script>

<div class="w-full max-w-3xl mx-auto px-4">
  <PageTitle {title} />
  {#if appStore.isLoading}
    <div class="flex justify-center items-center h-full">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
      ></div>
    </div>
  {:else}
    <ul class="flex flex-col gap-2 pl-4">
      {#each appStore.items as item (item.id)}
        <li
          class="text-lg vertical-align-middle flex items-center"
          in:slide={{
            duration: 300,
            delay: item.id === appStore.lastAddedItemId ? 100 : 0,
          }}
          out:slide={{ duration: 300 }}
        >
          <Item
            {item}
            onPressEnter={(insertAfterIndex, parentItem) =>
              addItem(insertAfterIndex, parentItem)}
            isNew={item.id === appStore.lastAddedItemId}
          />
        </li>
      {/each}
    </ul>
    <div class="mt-4">
      <button onclick={() => addItem()} class="p-2 text-gray-500">
        <PlusIcon />
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
