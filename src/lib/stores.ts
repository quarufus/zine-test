import {writable} from 'svelte/store';

export let store = writable({
  index: 0
});

export function setIndex(index) {
  store.set({
    index: index
  });
  index = index;
}
