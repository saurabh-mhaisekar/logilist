<script lang="ts">
  let name = $state("");
  let greetMsg = $state("");

  async function greet(event: Event) {
    event.preventDefault();
    greetMsg = "Hello, " + name;
  }
</script>

<main class="container">
  <h1>Welcome to Tauri + Svelte</h1>

  <form class="row" onsubmit={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit" class="bg-blue-500 text-white p-2 rounded-md"
      >Greet</button
    >
  </form>
  <p class="text-red-500">{greetMsg}</p>
</main>

<style lang="postcss">
  @reference "tailwindcss";
</style>
