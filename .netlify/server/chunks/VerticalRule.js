import { c as create_ssr_component, e as escape } from "./ssr.js";
const css$1 = {
  code: "ul.svelte-1rnrle{background-color:var(--bg);list-style:none;display:flex;border-bottom:var(--border);margin:0;padding:0}li.svelte-1rnrle{padding:20px;width:50%;font-weight:500;font-size:1em}#title.svelte-1rnrle{text-align:left}#burger.svelte-1rnrle{text-align:right}",
  map: '{"version":3,"file":"MobileTop.svelte","sources":["MobileTop.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let toggleMenu;\\nexport let title = \\"Bitoni\\";\\nexport let button;\\n<\/script>\\n\\n<ul class=\\"fixed w-full bg-white z-10 top-0\\">\\n\\t<li id=\\"title\\">{title}</li>\\n\\t<li id=\\"burger\\"><button on:click={toggleMenu}>{button}</button></li>\\n</ul>\\n\\n<style>\\n\\tul {\\n\\t\\tbackground-color: var(--bg);\\n\\t\\tlist-style: none;\\n\\t\\tdisplay: flex;\\n\\t\\tborder-bottom: var(--border);\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t}\\n\\tli {\\n\\t\\tpadding: 20px;\\n\\t\\twidth: 50%;\\n\\t\\tfont-weight: 500;\\n\\t\\tfont-size: 1em;\\n\\t}\\n\\t#title {\\n\\t\\ttext-align: left;\\n\\t}\\n\\t#burger {\\n\\t\\ttext-align: right;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAWC,gBAAG,CACF,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CACV,CACA,gBAAG,CACF,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,GACZ,CACA,oBAAO,CACN,UAAU,CAAE,IACb,CACA,qBAAQ,CACP,UAAU,CAAE,KACb"}'
};
const MobileTop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggleMenu } = $$props;
  let { title = "Bitoni" } = $$props;
  let { button } = $$props;
  if ($$props.toggleMenu === void 0 && $$bindings.toggleMenu && toggleMenu !== void 0)
    $$bindings.toggleMenu(toggleMenu);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.button === void 0 && $$bindings.button && button !== void 0)
    $$bindings.button(button);
  $$result.css.add(css$1);
  return `<ul class="fixed w-full bg-white z-10 top-0 svelte-1rnrle"><li id="title" class="svelte-1rnrle">${escape(title)}</li> <li id="burger" class="svelte-1rnrle"><button>${escape(button)}</button></li> </ul>`;
});
const css = {
  code: "div.svelte-1ccs29o{background-color:var(--accent);width:2px;top:var(--top);position:absolute;height:100%;left:calc(50% - 1px);position:fixed}",
  map: '{"version":3,"file":"VerticalRule.svelte","sources":["VerticalRule.svelte"],"sourcesContent":["<script>\\n  export let full = false;\\n  let top = full ? \\"0\\" : \\"64px\\";\\n<\/script>\\n\\n<!--<div id=\\"left\\"></div>-->\\n<div style=\\"--top: {top}\\"></div>\\n\\n<!--<div id=\\"right\\"></div>-->\\n\\n<style>\\n  /*\\n  #left {\\n    width: 47px;\\n    height: 100%;\\n    flex-shrink: 0;\\n    background: linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, #000 100%);\\n    position: absolute;\\n    left: 47px;\\n  }\\n  */\\n  div {\\n    background-color: var(--accent);\\n    width: 2px;\\n    top: var(--top);\\n    position: absolute;\\n    height: 100%;\\n    left: calc(50% - 1px);\\n    position: fixed;\\n  }\\n  /*\\n  #right {\\n    width: 68px;\\n    height: 100%;\\n    flex-shrink: 0;\\n    background: linear-gradient(\\n      270deg,\\n      rgba(217, 217, 217, 0) 0%,\\n      rgba(255, 255, 255, 0.51) 49.5%,\\n      #000 100%\\n    );\\n  }\\n  */\\n</style>\\n"],"names":[],"mappings":"AAqBE,kBAAI,CACF,gBAAgB,CAAE,IAAI,QAAQ,CAAC,CAC/B,KAAK,CAAE,GAAG,CACV,GAAG,CAAE,IAAI,KAAK,CAAC,CACf,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CACrB,QAAQ,CAAE,KACZ"}'
};
const VerticalRule = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { full = false } = $$props;
  let top = full ? "0" : "64px";
  if ($$props.full === void 0 && $$bindings.full && full !== void 0)
    $$bindings.full(full);
  $$result.css.add(css);
  return ` <div style="${"--top: " + escape(top, true)}" class="svelte-1ccs29o"></div> `;
});
export {
  MobileTop as M,
  VerticalRule as V
};
