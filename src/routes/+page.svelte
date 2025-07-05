<script lang="ts">
  import PlusIcon from "$lib/components/icons/PlusIcon.svelte";
  import Item from "$lib/components/Item.svelte";
  import PageTitle from "$lib/components/PageTitle.svelte";
  import type ItemInterface from "$lib/interfaces/ItemInterface";
  import { insertItem } from "$lib/util/local_db_ops";
  // Variables
  let title = $state("");
  let itemDescription = $state("");
  let items = $state<ItemInterface[]>([]);

  let lastAddedItemId = $state<string | null>(null);

  const addItem = () => {
    const id = crypto.randomUUID();
    const newItem: ItemInterface = { id, description: "", status: "active" };
    items.push(newItem);
    lastAddedItemId = id;
    insertItem(newItem);
    return id;
  };
</script>

<div class="w-full max-w-3xl mx-auto px-4">
  <PageTitle {title} />
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
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
