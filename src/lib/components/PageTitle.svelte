<script lang="ts">
  let { title } = $props();
</script>

<div class="w-full">
  <input
    type="text"
    bind:value={title}
    placeholder="Untitled"
    class="text-2xl font-bold border-gray-300 focus:border-blue-500 focus:outline-none w-full p-4 pl-0"
  />
</div>
