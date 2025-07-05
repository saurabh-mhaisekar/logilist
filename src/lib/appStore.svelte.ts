import type ItemInterface from "$lib/interfaces/ItemInterface";

const appStore = $state({
  items: [] as ItemInterface[],
  isLoading: true,
  lastAddedItemId: null as string | null
});

export default appStore;