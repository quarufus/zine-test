import {writable} from 'svelte/store';

export const store = writable({
  index: 0
});

export function setIndex(index) {
  store.set({
    index: index
  });
  index = index;
}
