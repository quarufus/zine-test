import { c as create_ssr_component, a as subscribe, e as escape } from "./ssr.js";
import { p as page } from "./stores.js";
const css$2 = {
  code: "#ul.svelte-2uz6a1.svelte-2uz6a1{display:grid;grid-template-columns:2fr repeat(4, 1fr) 2fr;flex-flow:row nowrap;z-index:12;width:100%;justify-content:space-between;border-bottom:var(--border);height:64px;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);position:absolute}div.svelte-2uz6a1.svelte-2uz6a1:has(> a.active){background-color:black}div.svelte-2uz6a1:has(> div) .active.svelte-2uz6a1{color:white}#ul.svelte-2uz6a1>div.svelte-2uz6a1{padding:20px;flex-grow:1;text-align:center}#ul.svelte-2uz6a1>.arrow.svelte-2uz6a1{flex-grow:2}#ul.svelte-2uz6a1>#left.svelte-2uz6a1{text-align:left}#ul.svelte-2uz6a1>#right.svelte-2uz6a1{text-align:right}a.svelte-2uz6a1.svelte-2uz6a1{border:none}a.svelte-2uz6a1.svelte-2uz6a1:hover{border-bottom:5px solid black}.active.svelte-2uz6a1.svelte-2uz6a1:hover{border-bottom:5px solid white}",
  map: '{"version":3,"file":"Nav.svelte","sources":["Nav.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { page } from \\"$app/stores\\";\\nexport let index;\\nconst title = [\\"Start\\", \\"Home\\", \\"Zines\\", \\"About\\", \\"Contact\\", \\"End\\"];\\n<\/script>\\n\\n<div id=\\"ul\\">\\n  <div class=\\"arrow\\" id=\\"left\\">\\n    {#if index > 0}\\n      {#if title[index] == \\"Start\\"}\\n        <a href=\\"/home\\">&lt- {title[index]}</a>\\n      {:else}\\n        <a href=\\"/{title[index].toLowerCase()}\\">&lt- {title[index]}</a>\\n      {/if}\\n    {/if}\\n  </div>\\n  <div>\\n    <a href=\\"./home\\" class:active={$page.url.pathname.includes(\\"/home\\")}\\n      >To Bitoni</a\\n    >\\n  </div>\\n  <div>\\n    <a href=\\"./zines\\" class:active={$page.url.pathname.includes(\\"/zines\\")}\\n      >Zines</a\\n    >\\n  </div>\\n  <div>\\n    <a href=\\"./about\\" class:active={$page.url.pathname.includes(\\"/about\\")}\\n      >About</a\\n    >\\n  </div>\\n  <div>\\n    <a href=\\"./contact\\" class:active={$page.url.pathname.includes(\\"/contact\\")}\\n      >Contact</a\\n    >\\n  </div>\\n  <div class=\\"arrow\\" id=\\"right\\">\\n    {#if index < 3}\\n      <a href=\\"/{title[index + 2].toLowerCase()}\\">{title[index + 2]} -&gt</a>\\n    {/if}\\n  </div>\\n</div>\\n\\n<style>\\n  #ul {\\n    display: grid;\\n    grid-template-columns: 2fr repeat(4, 1fr) 2fr;\\n    flex-flow: row nowrap;\\n    z-index: 12;\\n    width: 100%;\\n    justify-content: space-between;\\n    border-bottom: var(--border);\\n    height: 64px;\\n    -webkit-backdrop-filter: blur(10px);\\n            backdrop-filter: blur(10px);\\n    position: absolute;\\n  }\\n  div:has(> a.active) {\\n    background-color: black;\\n  }\\n  div:has(> div) .active {\\n    color: white;\\n  }\\n  #ul > div {\\n    padding: 20px;\\n    flex-grow: 1;\\n    text-align: center;\\n  }\\n  #ul > .arrow {\\n    flex-grow: 2;\\n  }\\n  #ul > #left {\\n    text-align: left;\\n  }\\n  #ul > #right {\\n    text-align: right;\\n  }\\n  a {\\n    border: none;\\n  }\\n  a:hover {\\n    border-bottom: 5px solid black;\\n  }\\n  .active:hover {\\n    border-bottom: 5px solid white;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2CE,+BAAI,CACF,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAAC,OAAO,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAC7C,SAAS,CAAE,GAAG,CAAC,MAAM,CACrB,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,eAAe,CAAE,aAAa,CAC9B,aAAa,CAAE,IAAI,QAAQ,CAAC,CAC5B,MAAM,CAAE,IAAI,CACZ,uBAAuB,CAAE,KAAK,IAAI,CAAC,CAC3B,eAAe,CAAE,KAAK,IAAI,CAAC,CACnC,QAAQ,CAAE,QACZ,CACA,+BAAG,KAAK,CAAC,CAAC,CAAC,OAAO,CAAE,CAClB,gBAAgB,CAAE,KACpB,CACA,iBAAG,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,qBAAQ,CACrB,KAAK,CAAE,KACT,CACA,iBAAG,CAAG,iBAAI,CACR,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,CAAC,CACZ,UAAU,CAAE,MACd,CACA,iBAAG,CAAG,oBAAO,CACX,SAAS,CAAE,CACb,CACA,iBAAG,CAAG,mBAAM,CACV,UAAU,CAAE,IACd,CACA,iBAAG,CAAG,oBAAO,CACX,UAAU,CAAE,KACd,CACA,6BAAE,CACA,MAAM,CAAE,IACV,CACA,6BAAC,MAAO,CACN,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAC3B,CACA,mCAAO,MAAO,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAC3B"}'
};
const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { index } = $$props;
  const title = ["Start", "Home", "Zines", "About", "Contact", "End"];
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$result.css.add(css$2);
  $$unsubscribe_page();
  return `<div id="ul" class="svelte-2uz6a1"><div class="arrow svelte-2uz6a1" id="left">${index > 0 ? `${title[index] == "Start" ? `<a href="/home" class="svelte-2uz6a1">&lt;- ${escape(title[index])}</a>` : `<a href="${"/" + escape(title[index].toLowerCase(), true)}" class="svelte-2uz6a1">&lt;- ${escape(title[index])}</a>`}` : ``}</div> <div class="svelte-2uz6a1"><a href="./home" class="${["svelte-2uz6a1", $page.url.pathname.includes("/home") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1ek09x5">To Bitoni</a></div> <div class="svelte-2uz6a1"><a href="./zines" class="${["svelte-2uz6a1", $page.url.pathname.includes("/zines") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1rj7vqm">Zines</a></div> <div class="svelte-2uz6a1"><a href="./about" class="${["svelte-2uz6a1", $page.url.pathname.includes("/about") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-1pmlbfm">About</a></div> <div class="svelte-2uz6a1"><a href="./contact" class="${["svelte-2uz6a1", $page.url.pathname.includes("/contact") ? "active" : ""].join(" ").trim()}" data-svelte-h="svelte-lta1qf">Contact</a></div> <div class="arrow svelte-2uz6a1" id="right">${index < 3 ? `<a href="${"/" + escape(title[index + 2].toLowerCase(), true)}" class="svelte-2uz6a1">${escape(title[index + 2])} -&gt;</a>` : ``}</div> </div>`;
});
const css$1 = {
  code: "div.svelte-1bp7iig{width:calc(var(--width) - 1px);position:absolute;height:100%;background-color:var(--bg);z-index:12;text-align:left}ul.svelte-1bp7iig{list-style:none;font-size:11vmin}#close.svelte-1bp7iig{text-align:right;margin:21px 19px;float:right}",
  map: '{"version":3,"file":"Menu.svelte","sources":["Menu.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let toggleMenu;\\nexport let innerWidth;\\nlet width;\\n$:\\n  if (innerWidth > 900) {\\n    width = 50;\\n  } else {\\n    width = 100;\\n  }\\n<\/script>\\n\\n<div style=\\"--width: {width}%\\" class=\\"top-0\\">\\n\\t<button id=\\"close\\" on:click={toggleMenu}>Close</button>\\n\\t<ul class=\\"p-20\\">\\n\\t\\t<li><a href=\\"/home\\" on:click={toggleMenu}>Home</a></li>\\n\\t\\t<li><a href=\\"/zines\\" on:click={toggleMenu}>Zines</a></li>\\n\\t\\t<li><a href=\\"/about\\" on:click={toggleMenu}>About</a></li>\\n\\t\\t<li><a href=\\"/contact\\" on:click={toggleMenu}>Contact</a></li>\\n\\t</ul>\\n</div>\\n\\n<style>\\n\\tdiv {\\n\\t\\twidth: calc(var(--width) - 1px);\\n\\t\\tposition: absolute;\\n\\t\\theight: 100%;\\n\\t\\tbackground-color: var(--bg);\\n\\t\\tz-index: 12;\\n\\t\\ttext-align: left;\\n\\t}\\n\\tul {\\n\\t\\tlist-style: none;\\n\\t\\tfont-size: 11vmin;\\n\\t}\\n\\t#close {\\n\\t\\ttext-align: right;\\n\\t\\tmargin: 21px 19px;\\n\\t\\tfloat: right;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAsBC,kBAAI,CACH,KAAK,CAAE,KAAK,IAAI,OAAO,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC/B,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,OAAO,CAAE,EAAE,CACX,UAAU,CAAE,IACb,CACA,iBAAG,CACF,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,MACZ,CACA,qBAAO,CACN,UAAU,CAAE,KAAK,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,KAAK,CAAE,KACR"}'
};
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { toggleMenu } = $$props;
  let { innerWidth } = $$props;
  let width;
  if ($$props.toggleMenu === void 0 && $$bindings.toggleMenu && toggleMenu !== void 0)
    $$bindings.toggleMenu(toggleMenu);
  if ($$props.innerWidth === void 0 && $$bindings.innerWidth && innerWidth !== void 0)
    $$bindings.innerWidth(innerWidth);
  $$result.css.add(css$1);
  {
    if (innerWidth > 900) {
      width = 50;
    } else {
      width = 100;
    }
  }
  return `<div style="${"--width: " + escape(width, true) + "%"}" class="top-0 svelte-1bp7iig"><button id="close" class="svelte-1bp7iig" data-svelte-h="svelte-15oyq41">Close</button> <ul class="p-20 svelte-1bp7iig"><li><a href="/home" data-svelte-h="svelte-8iykj6">Home</a></li> <li><a href="/zines" data-svelte-h="svelte-1xjlumm">Zines</a></li> <li><a href="/about" data-svelte-h="svelte-16f197a">About</a></li> <li><a href="/contact" data-svelte-h="svelte-16acngk">Contact</a></li></ul> </div>`;
});
const css = {
  code: "ul.svelte-1vgn8xm{list-style:none;display:flex;border-top:var(--border);margin:0;padding:0;bottom:0;position:fixed;width:100%;background-color:var(--bg);z-index:1}.left.svelte-1vgn8xm{text-align:left}.right.svelte-1vgn8xm{text-align:right;align-items:right}li.svelte-1vgn8xm{padding:20px;float:left;width:50%;font-weight:500}",
  map: '{"version":3,"file":"MobileFooter.svelte","sources":["MobileFooter.svelte"],"sourcesContent":["<script lang=\\"ts\\">export let index;\\nconst title = [\\"Home\\", \\"Zines\\", \\"About\\", \\"Contact\\"];\\n<\/script>\\n\\n<ul>\\n\\t<li class=\\"left\\">\\n\\t\\t{#if index > 0}\\n\\t\\t\\t<a href=\\"/{title[index - 1].toLowerCase()}\\">&lt- {title[index - 1]}</a>\\n\\t\\t{/if}\\n\\t</li>\\n\\t<li class=\\"right\\">\\n\\t\\t{#if index < title.length - 1}\\n\\t\\t\\t<a href=\\"/{title[index + 1].toLowerCase()}\\">{title[index + 1]} -></a>\\n\\t\\t{/if}\\n\\t</li>\\n</ul>\\n\\n<style>\\n\\tul {\\n\\t\\tlist-style: none;\\n\\t\\tdisplay: flex;\\n\\t\\tborder-top: var(--border);\\n\\t\\tmargin: 0;\\n\\t\\tpadding: 0;\\n\\t\\tbottom: 0;\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100%;\\n\\t\\tbackground-color: var(--bg);\\n\\t\\tz-index: 1;\\n\\t}\\n\\t.left {\\n\\t\\ttext-align: left;\\n\\t}\\n\\t.right {\\n\\t\\ttext-align: right;\\n\\t\\talign-items: right;\\n\\t}\\n\\tli {\\n\\t\\tpadding: 20px;\\n\\t\\tfloat: left;\\n\\t\\twidth: 50%;\\n\\t\\tfont-weight: 500;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAkBC,iBAAG,CACF,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,QAAQ,CAAC,CACzB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CACT,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,gBAAgB,CAAE,IAAI,IAAI,CAAC,CAC3B,OAAO,CAAE,CACV,CACA,oBAAM,CACL,UAAU,CAAE,IACb,CACA,qBAAO,CACN,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,KACd,CACA,iBAAG,CACF,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GACd"}'
};
const MobileFooter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { index } = $$props;
  const title = ["Home", "Zines", "About", "Contact"];
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  $$result.css.add(css);
  return `<ul class="svelte-1vgn8xm"><li class="left svelte-1vgn8xm">${index > 0 ? `<a href="${"/" + escape(title[index - 1].toLowerCase(), true)}">&lt;- ${escape(title[index - 1])}</a>` : ``}</li> <li class="right svelte-1vgn8xm">${index < title.length - 1 ? `<a href="${"/" + escape(title[index + 1].toLowerCase(), true)}">${escape(title[index + 1])} -&gt;</a>` : ``}</li> </ul>`;
});
export {
  Menu as M,
  Nav as N,
  MobileFooter as a
};
