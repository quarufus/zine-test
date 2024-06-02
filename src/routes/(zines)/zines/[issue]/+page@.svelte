<script lang="ts">
  import IssueaNav from "$lib/IssueaNav.svelte";
  import Settings from "$lib/Settings.svelte";
  import VerticalRule from "$lib/VerticalRule.svelte";
  import { onDestroy, onMount } from "svelte";
  import { getChunks } from "$lib/pages";
  import MobileZineNav from "$lib/MobileZineNav.svelte";
  import MobileTop from "$lib/MobileTop.svelte";
  import { readerSettings } from "$lib/stores";
  import First from "$lib/zines/One.svelte";
  import Second from "$lib/zines/Two.svelte";
  export let data;

  $: settings = $readerSettings;
  let mounted = false;

  const unsubscribe = readerSettings.subscribe((value) => {
    settings = settings;
    if (mounted)
      getChunks(value.fontFamily, value.fontSize, value.letterSpacing);
  });

  let showSettings: boolean = false;
  $: innerWidth = 0;
  let index: number = 0;
  let root: Element;

  $: navINdex = 0;
  $: if (innerWidth > 900) {
    navINdex = index * 2;
  } else {
    navINdex = index;
  }

  let chunks: HTMLElement[];
  $: chunks = [];
  $: length = chunks.length;
  let root_container: HTMLElement;

  $: if (mounted) {
    index;
    chunks;
    root_container.innerHTML = "";
    for (let chunk of getVisibleChunks()) {
      if (chunk != null) root_container?.appendChild(chunk);
    }
  }

  function toggleSettings() {
    showSettings = !showSettings;
  }

  function next() {
    if (index < length) {
      index++;
    }
  }
  function previous() {
    if (index > 0) {
      index--;
    }
  }
  function getVisibleChunks() {
    let visible: Array<Node> = [];
    if (window.innerWidth > 900) {
      visible.push(chunks[index * 2]);
      if (chunks[index * 2 + 1] != null) {
        visible.push(chunks[index * 2 + 1]);
      }
    } else {
      visible.push(chunks[index]);
    }
    return visible;
  }

  onMount(() => {
    mounted = true;

    root_container = document.getElementById("root_container")!;

    const resizeObserver = new ResizeObserver(() => {
      getChunks(
        settings.fontFamily,
        settings.fontSize,
        settings.letterSpacing,
      ).then((value: HTMLElement[]) => (chunks = value));
    });

    resizeObserver.observe(root);

    return () => resizeObserver.unobserve(root);
  });
  onDestroy(unsubscribe);
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <title>To Bitoni | {data.slug}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Fira Code"
  />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Literata"
  />
</svelte:head>

<main>
  {#if showSettings}
    <Settings {toggleSettings} {innerWidth} />
  {/if}
  {#if innerWidth > 900}
    <IssueaNav
      title={data.slug}
      {toggleSettings}
      {next}
      {previous}
      index={navINdex}
      bind:length
    />
    <VerticalRule full={true} />
  {:else}
    <MobileTop
      toggleMenu={toggleSettings}
      title="{data.slug} | {index}"
      button="Settings"
    />
    <MobileZineNav {index} {next} {previous} {length} />
  {/if}

  <div bind:this={root} id="source">
    {#if data.slug == "One"}
      <First />
    {:else if data.slug == "Two"}
      <Second />
    {/if}
  </div>
  <div id="render"></div>
  <div class="root_container" id="root_container"></div>
</main>

<style>
  :root {
    background-color: var(--bg);
  }
  :global(body) {
    margin: 0;
  }
  #source {
    position: absolute;
    top: -30000px;
  }
  #render {
    position: absolute;
    top: -30000px;
  }
  .root_container {
    display: flex;
    height: 100dvh;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    text-align: justify;
    line-height: 1.5;
  }
</style>
