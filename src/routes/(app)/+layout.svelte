<script lang="ts">
  import Top from "$lib/Nav.svelte";
  import MobileTop from "$lib/MobileTop.svelte";
  import Menu from "$lib/Menu.svelte";
  import MobileFooter from "$lib/MobileFooter.svelte";
  import VerticalRule from "$lib/VerticalRule.svelte";
  import { store, setIndex } from "$lib/stores";
  import { onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  let index = setIndex(0);

  const unsubscribeIndex = store.subscribe(() => {
    index = index;
  });

  $: innerWidth = 901;
  $: menu = false;
  function toggleMenu() {
    menu = !menu;
  }

  $: pages = [
    $_("nav.home"),
    $_("nav.zines"),
    $_("nav.about"),
    $_("nav.contact"),
  ];
  onDestroy(unsubscribeIndex);
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>{pages[$store.index]} | {$_("info.name")}</title>
  <meta property="og:description" content="A magazine" />
</svelte:head>

<main>
  {#if menu}
    <Menu {toggleMenu} {innerWidth} />
  {/if}
  {#if innerWidth > 900}
    <Top bind:index={$store.index} />
    <VerticalRule />
    <slot />
  {:else}
    <MobileTop {toggleMenu} button="Menu" />
    <slot />
    <MobileFooter bind:index={$store.index} />
  {/if}
</main>

<style>
  :root {
    background-color: var(--bg);
  }
  :global(body) {
    margin: 0;
  }
</style>
