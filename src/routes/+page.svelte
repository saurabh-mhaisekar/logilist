<script lang="ts">
  import PlusIcon from "$lib/components/icons/PlusIcon.svelte";
  import Item from "$lib/components/Item.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import type ItemInterface from "$lib/interfaces/ItemInterface";
  import { getItems, insertItem } from "$lib/util/local_db_ops";
  import { onMount } from "svelte";
  // Variables
  let title = $state("");
  let itemDescription = $state("");
  let items = $state<ItemInterface[]>([]);
  let isLoading = $state(true);
  let lastAddedItemId = $state<string | null>(null);

  const addItem = () => {
    const id = crypto.randomUUID();
    const newItem: ItemInterface = { id, description: "", status: "active" };
    items.push(newItem);
    lastAddedItemId = id;
    insertItem(newItem);
    return id;
  };

  onMount(() => {
    getItems().then((dbItems: ItemInterface[]) => {
      dbItems.forEach((item) => {
        items.push(item);
      });
    });
    isLoading = false;
  });
</script>

<div class="w-full max-w-3xl mx-auto px-4">
  <PageTitle {title} />
  {#if isLoading}
    <div class="flex justify-center items-center h-full">
      <div
        class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
      ></div>
    </div>
  {:else}
    <ul class="flex flex-col gap-2 list-disc pl-4">
      {#each items as item}
        <li class="text-lg vertical-align-middle">
          <Item
            {item}
            onPressEnter={() => addItem()}
            isNew={item.id === lastAddedItemId}
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
