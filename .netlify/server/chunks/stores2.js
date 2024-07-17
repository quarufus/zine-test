import { w as writable } from "./index2.js";
const store = writable({
  index: 0
});
function setIndex(index) {
  store.set({
    index
  });
  index = index;
}
const readerSettings = writable({
  theme: "Default",
  fontFamily: "Inter",
  fontSize: 17,
  letterSpacing: 0
});
export {
  store as a,
  readerSettings as r,
  setIndex as s
};
