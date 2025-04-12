<script lang="ts">
  import PageTitle from "$lib/components/PageTitle.svelte";
  import Node from "$lib/components/Node.svelte";
  import { nodesStore, addNode } from "$lib/stores/nodesStore";
  import PlusIcon from "$lib/components/icons/PlusIcon.svelte";
  let title = $state("Untitled");
</script>

<div class="w-full max-w-3xl mx-auto px-4">
  <PageTitle {title} />
  <ul class="flex flex-col gap-2 list-disc pl-4">
    {#each $nodesStore as node}
      <li class="text-lg vertical-align-middle">
        <Node title={node.title} id={node.id} isNew={node.title === ""} />
      </li>
    {/each}
  </ul>
  <div class="mt-4">
    <button
      onclick={() => addNode()}
      class="bg-blue-500 text-white p-2 rounded-md"
    >
      <PlusIcon />
    </button>
  </div>
</div>

<style lang="postcss">
  @reference "tailwindcss";
</style>
