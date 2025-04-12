import { writable } from 'svelte/store';

export const pageTitle = writable('Untitled');

export function updatePageTitle(newTitle: string) {
  pageTitle.set(newTitle || 'Untitled');
} 