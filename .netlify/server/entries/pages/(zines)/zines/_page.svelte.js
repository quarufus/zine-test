import { c as create_ssr_component, b as each, e as escape, a as subscribe, v as validate_component, d as spread, f as escape_object, h as add_attribute } from "../../../../chunks/ssr.js";
import { P as Pages } from "../../../../chunks/Pages.js";
import { S as SinglePage } from "../../../../chunks/SinglePage.js";
/* empty css                                                     */
import { s as setIndex } from "../../../../chunks/stores2.js";
import "dequal";
import { c as createScrollArea } from "../../../../chunks/create.js";
const css$1 = {
  code: "button.svelte-1juog1m{border:2px solid black;height:17rem}",
  map: '{"version":3,"file":"Zines.svelte","sources":["Zines.svelte"],"sourcesContent":["<script>\\n    let zines = [\\"One\\", \\"Two\\", \\"Three\\", \\"Four\\", \\"Five\\"];\\n<\/script>\\n\\n<div class=\\"p-10\\">\\n    <h1 class=\\"my-5\\">Περιοδικά</h1>\\n    <div\\n        class=\\"grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 max-[450px]:grid-cols-1 xl:grid-cols-3 mx-[-10px]\\"\\n    >\\n        {#each zines as zine}\\n            <button\\n                class=\\"m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer text-center\\"\\n                on:click={() => {\\n                    location.href = \\"/zines/\\" + zine;\\n                }}\\n            >\\n                {zine}\\n            </button>\\n        {/each}\\n    </div>\\n</div>\\n\\n<style>\\n    button {\\n        border: 2px solid black;\\n        height: 17rem;\\n    }\\n</style>\\n"],"names":[],"mappings":"AAuBI,qBAAO,CACH,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,MAAM,CAAE,KACZ"}'
};
const Zines = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let zines = ["One", "Two", "Three", "Four", "Five"];
  $$result.css.add(css$1);
  return `<div class="p-10"><h1 class="my-5" data-svelte-h="svelte-8i1fc0">Περιοδικά</h1> <div class="grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 max-[450px]:grid-cols-1 xl:grid-cols-3 mx-[-10px]">${each(zines, (zine) => {
    return `<button class="m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer text-center svelte-1juog1m">${escape(zine)} </button>`;
  })}</div> </div>`;
});
const swan = "/_app/immutable/assets/swan.B3pqzHxi.jpg";
const css = {
  code: "#fuck.svelte-hv9lnl{height:calc(100dvh - 71px)}.left.svelte-hv9lnl{height:100vh}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport Pages from \\"$lib/Pages.svelte\\";\\n\\timport SinglePage from \\"$lib/SinglePage.svelte\\";\\n\\timport Home from \\"$lib/pages/Home.svelte\\";\\n\\timport swan from \\"$lib/zines/swan.jpg\\";\\n\\timport Zines from \\"$lib/pages/Zines.svelte\\";\\n\\timport { setIndex } from \\"$lib/stores\\";\\n\\timport { createScrollArea, melt } from \\"@melt-ui/svelte\\";\\n\\n\\tsetIndex(1);\\n\\tlet zines = [\\"One\\", \\"Two\\", \\"Three\\", \\"Four\\", \\"Five\\"];\\n\\t$: innerWidth = 901;\\n\\n\\tconst {\\n\\t\\telements: { root, content, viewport, corner, scrollbarY, thumbY },\\n\\t} = createScrollArea({\\n\\t\\ttype: \\"scroll\\",\\n\\t\\tdir: \\"ltr\\",\\n\\t});\\n<\/script>\\n\\n<svelte:window bind:innerWidth />\\n\\n<svelte:head>\\n\\t<meta\\n\\t\\tname=\\"description\\"\\n\\t\\tcontent=\\"Zines page for To Bitoni, a webzine focused on art\\"\\n\\t/>\\n</svelte:head>\\n\\n{#if innerWidth > 900}\\n\\t<Pages>\\n\\t\\t<!--<div slot=\\"left\\" style:background-image={swan} />-->\\n\\t\\t<div slot=\\"left\\" class=\\"left\\">\\n\\t\\t\\t<img\\n\\t\\t\\t\\tsrc={swan}\\n\\t\\t\\t\\talt=\\"swan\\"\\n\\t\\t\\t\\tclass=\\"object-cover object-top w-full h-full mt-[-64px]\\"\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div slot=\\"right\\" class=\\"m-0\\">\\n\\t\\t\\t<div\\n\\t\\t\\t\\t{...$root} use:$root.action\\n\\t\\t\\t\\tid=\\"fuck\\"\\n\\t\\t\\t\\tclass=\\"relative h-[calc(100dvh - 71px)] w-full overflow-hidden\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div {...$viewport} use:$viewport.action class=\\"h-full w-full\\">\\n\\t\\t\\t\\t\\t<div {...$content} use:$content.action>\\n\\t\\t\\t\\t\\t\\t<Zines />\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t{...$scrollbarY} use:$scrollbarY.action\\n\\t\\t\\t\\t\\tclass=\\"flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\t{...$thumbY} use:$thumbY.action\\n\\t\\t\\t\\t\\t\\tclass=\\"relative flex-1 rounded-full bg-black\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div {...$corner} use:$corner.action />\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</Pages>\\n{:else}\\n\\t<SinglePage>\\n\\t\\t<Zines slot=\\"content\\" />\\n\\t</SinglePage>\\n{/if}\\n\\n<style>\\n\\t#fuck {\\n\\t\\theight: calc(100dvh - 71px);\\n\\t}\\n\\t.left {\\n\\t\\theight: 100vh;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuEC,mBAAM,CACL,MAAM,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,IAAI,CAC3B,CACA,mBAAM,CACL,MAAM,CAAE,KACT"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let $root, $$unsubscribe_root;
  let $viewport, $$unsubscribe_viewport;
  let $content, $$unsubscribe_content;
  let $scrollbarY, $$unsubscribe_scrollbarY;
  let $thumbY, $$unsubscribe_thumbY;
  let $corner, $$unsubscribe_corner;
  setIndex(1);
  const { elements: { root, content, viewport, corner, scrollbarY, thumbY } } = createScrollArea({ type: "scroll", dir: "ltr" });
  $$unsubscribe_root = subscribe(root, (value) => $root = value);
  $$unsubscribe_content = subscribe(content, (value) => $content = value);
  $$unsubscribe_viewport = subscribe(viewport, (value) => $viewport = value);
  $$unsubscribe_corner = subscribe(corner, (value) => $corner = value);
  $$unsubscribe_scrollbarY = subscribe(scrollbarY, (value) => $scrollbarY = value);
  $$unsubscribe_thumbY = subscribe(thumbY, (value) => $thumbY = value);
  $$result.css.add(css);
  innerWidth = 901;
  $$unsubscribe_root();
  $$unsubscribe_viewport();
  $$unsubscribe_content();
  $$unsubscribe_scrollbarY();
  $$unsubscribe_thumbY();
  $$unsubscribe_corner();
  return ` ${$$result.head += `<!-- HEAD_svelte-tj2fab_START --><meta name="description" content="Zines page for To Bitoni, a webzine focused on art"><!-- HEAD_svelte-tj2fab_END -->`, ""} ${innerWidth > 900 ? `${validate_component(Pages, "Pages").$$render($$result, {}, {}, {
    right: () => {
      return `<div slot="right" class="m-0"><div${spread(
        [
          escape_object($root),
          { id: "fuck" },
          {
            class: "relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
          }
        ],
        { classes: "svelte-hv9lnl" }
      )}><div${spread([escape_object($viewport), { class: "h-full w-full" }], { classes: "svelte-hv9lnl" })}><div${spread([escape_object($content)], { classes: "svelte-hv9lnl" })}>${validate_component(Zines, "Zines").$$render($$result, {}, {}, {})}</div></div> <div${spread(
        [
          escape_object($scrollbarY),
          {
            class: "flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors"
          }
        ],
        { classes: "svelte-hv9lnl" }
      )}><div${spread(
        [
          escape_object($thumbY),
          {
            class: "relative flex-1 rounded-full bg-black"
          }
        ],
        { classes: "svelte-hv9lnl" }
      )}></div></div> <div${spread([escape_object($corner)], { classes: "svelte-hv9lnl" })}></div></div></div>`;
    },
    left: () => {
      return `<div slot="left" class="left svelte-hv9lnl" data-svelte-h="svelte-jg85zc"><img${add_attribute("src", swan, 0)} alt="swan" class="object-cover object-top w-full h-full mt-[-64px]"></div>`;
    }
  })}` : `${validate_component(SinglePage, "SinglePage").$$render($$result, {}, {}, {
    content: () => {
      return `${validate_component(Zines, "Zines").$$render($$result, { slot: "content" }, {}, {})}`;
    }
  })}`}`;
});
export {
  Page as default
};
