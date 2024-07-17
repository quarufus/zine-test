import { c as create_ssr_component } from "./ssr.js";
import "./SinglePage.js";
const css = {
  code: ".wrapper.svelte-1jsavk2{width:100%;height:100vh;position:relative}.left.svelte-1jsavk2,.right.svelte-1jsavk2{margin-top:64px;height:calc(100vh - 64px)}.left.svelte-1jsavk2{position:absolute;left:0;width:50%}.right.svelte-1jsavk2{position:absolute;right:0;top:0;width:50%}",
  map: '{"version":3,"file":"Pages.svelte","sources":["Pages.svelte"],"sourcesContent":["<script>\\n<\/script>\\n\\n<div class=\\"wrapper\\">\\n  <div class=\\"left\\"><slot name=\\"left\\" /></div>\\n  <div class=\\"right\\"><slot name=\\"right\\" /></div>\\n</div>\\n\\n<style>\\n  .wrapper {\\n    width: 100%;\\n    height: 100vh;\\n    position: relative;\\n  }\\n  .left,\\n  .right {\\n    margin-top: 64px;\\n    height: calc(100vh - 64px);\\n  }\\n  .left {\\n    position: absolute;\\n    left: 0;\\n    width: 50%;\\n  }\\n  .right {\\n    position: absolute;\\n    right: 0;\\n    top: 0;\\n    width: 50%;\\n  }\\n</style>\\n"],"names":[],"mappings":"AASE,uBAAS,CACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QACZ,CACA,oBAAK,CACL,qBAAO,CACL,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAC3B,CACA,oBAAM,CACJ,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,GACT,CACA,qBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,CACN,KAAK,CAAE,GACT"}'
};
const Pages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="wrapper svelte-1jsavk2"><div class="left svelte-1jsavk2">${slots.left ? slots.left({}) : ``}</div> <div class="right svelte-1jsavk2">${slots.right ? slots.right({}) : ``}</div> </div>`;
});
export {
  Pages as P
};
