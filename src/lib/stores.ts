import { writable } from "svelte/store";

export const store = writable({
  index: 0,
});

export function setIndex(index: number) {
  store.set({
    index: index,
  });
  index = index;
}

export const readerSettings = writable({
  theme: "Default",
  fontFamily: "Inter",
  fontSize: 17,
  letterSpacing: 0,
});

