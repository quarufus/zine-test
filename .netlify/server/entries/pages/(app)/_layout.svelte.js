import { c as create_ssr_component, a as subscribe, o as onDestroy, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { M as Menu, N as Nav, a as MobileFooter } from "../../../chunks/MobileFooter.js";
import { V as VerticalRule, M as MobileTop } from "../../../chunks/VerticalRule.js";
import { s as setIndex, a as store } from "../../../chunks/stores2.js";
const css = {
  code: ":root{background-color:var(--bg)}body{margin:0}",
  map: '{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Top from \\"$lib/Nav.svelte\\";\\nimport MobileTop from \\"$lib/MobileTop.svelte\\";\\nimport Menu from \\"$lib/Menu.svelte\\";\\nimport MobileFooter from \\"$lib/MobileFooter.svelte\\";\\nimport VerticalRule from \\"$lib/VerticalRule.svelte\\";\\nimport { store, setIndex } from \\"$lib/stores\\";\\nimport { onDestroy } from \\"svelte\\";\\nlet index = setIndex(0);\\nconst unsubscribeIndex = store.subscribe(() => {\\n  index = index;\\n});\\n$:\\n  innerWidth = 901;\\n$:\\n  menu = false;\\nfunction toggleMenu() {\\n  menu = !menu;\\n}\\nconst pages = [\\"Home\\", \\"Zines\\", \\"About\\", \\"Contact\\", \\"End\\"];\\nonDestroy(unsubscribeIndex);\\n<\/script>\\n\\n<svelte:window bind:innerWidth />\\n\\n<svelte:head>\\n\\t<title>To Bitoni | {pages[$store.index]}</title>\\n\\t<meta property=\\"og:description\\" content=\\"A magazine\\" />\\n</svelte:head>\\n\\n<main>\\n\\t{#if menu}\\n\\t\\t<Menu {toggleMenu} {innerWidth} />\\n\\t{/if}\\n\\t{#if innerWidth > 900}\\n\\t\\t<Top bind:index={$store.index} />\\n\\t\\t<VerticalRule />\\n\\t\\t<slot />\\n\\t{:else}\\n\\t\\t<MobileTop {toggleMenu} button=\\"Menu\\" />\\n\\t\\t<slot />\\n\\t\\t<MobileFooter bind:index={$store.index} />\\n\\t{/if}\\n</main>\\n\\n<style>\\n\\t:root {\\n\\t\\tbackground-color: var(--bg);\\n\\t}\\n\\t:global(body) {\\n\\t\\tmargin: 0;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA6CC,KAAM,CACL,gBAAgB,CAAE,IAAI,IAAI,CAC3B,CACQ,IAAM,CACb,MAAM,CAAE,CACT"}'
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let menu;
  let $store, $$unsubscribe_store;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  setIndex(0);
  const unsubscribeIndex = store.subscribe(() => {
  });
  function toggleMenu() {
    menu = !menu;
  }
  const pages = ["Home", "Zines", "About", "Contact", "End"];
  onDestroy(unsubscribeIndex);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    innerWidth = 901;
    menu = false;
    $$rendered = ` ${$$result.head += `<!-- HEAD_svelte-qj20ep_START -->${$$result.title = `<title>To Bitoni | ${escape(pages[$store.index])}</title>`, ""}<meta property="og:description" content="A magazine"><!-- HEAD_svelte-qj20ep_END -->`, ""} <main>${menu ? `${validate_component(Menu, "Menu").$$render($$result, { toggleMenu, innerWidth }, {}, {})}` : ``} ${innerWidth > 900 ? `${validate_component(Nav, "Top").$$render(
      $$result,
      { index: $store.index },
      {
        index: ($$value) => {
          $store.index = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(VerticalRule, "VerticalRule").$$render($$result, {}, {}, {})} ${slots.default ? slots.default({}) : ``}` : `${validate_component(MobileTop, "MobileTop").$$render($$result, { toggleMenu, button: "Menu" }, {}, {})} ${slots.default ? slots.default({}) : ``} ${validate_component(MobileFooter, "MobileFooter").$$render(
      $$result,
      { index: $store.index },
      {
        index: ($$value) => {
          $store.index = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} </main>`;
  } while (!$$settled);
  $$unsubscribe_store();
  return $$rendered;
});
export {
  Layout as default
};
