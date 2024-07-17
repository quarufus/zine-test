import { c as create_ssr_component } from "./ssr.js";
const css = {
  code: "div.svelte-nwgket{width:100%;position:relative}",
  map: '{"version":3,"file":"SinglePage.svelte","sources":["SinglePage.svelte"],"sourcesContent":["<div id=\\"wrapper\\">\\n  <div id=\\"inside\\" class=\\"my-20\\"><slot name=\\"content\\" /></div>\\n</div>\\n\\n<style>\\n  div {\\n    width: 100%;\\n    position: relative;\\n  }\\n</style>\\n"],"names":[],"mappings":"AAKE,iBAAI,CACF,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QACZ"}'
};
const SinglePage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div id="wrapper" class="svelte-nwgket"><div id="inside" class="my-20 svelte-nwgket">${slots.content ? slots.content({}) : ``}</div> </div>`;
});
export {
  SinglePage as S
};
