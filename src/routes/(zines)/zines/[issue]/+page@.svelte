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

  const unsubscribe = readerSettings.subscribe(() => {
    settings = settings;
  });

  let showSettings: boolean = false;
  $: innerWidth = 0;
  let index: number = 0;
  let root: Element;
  $readerSettings.fontSize = 17;
  $readerSettings.fontFamily = "Inter";

  let mounted = false;
  $: navINdex = 0;
  $: if (innerWidth > 900) {
    navINdex = index * 2;
  } else {
    navINdex = index;
  }
  $: font = settings.fontFamily;
  $: fontSize = settings.fontSize;

  let chunks: HTMLElement[];
  $: chunks = [];
  $: length = chunks.length;
  let root_container: HTMLElement;

  $: if (mounted) {
    index;
    chunks;
    root_container.innerHTML = "";
    for (let chunk of getVisibleChunks()) {
      root_container?.appendChild(chunk);
    }
  }

  $: if (mounted) chunks = getChunks(font, fontSize);

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

    chunks = getChunks(font, fontSize);
    root_container = document.getElementById("root_container")!;

    const resizeObserver = new ResizeObserver(() => {
      chunks = getChunks(font, fontSize);
    });

    resizeObserver.observe(root);

    return () => resizeObserver.unobserve(root);
  });
  onDestroy(() => {
    unsubscribe();
  });
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

{#if showSettings}
  <Settings
    {toggleSettings}
    {innerWidth}
    bind:size={settings.fontSize}
    bind:font={settings.fontFamily}
  />
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
  <VerticalRule />
{:else}
  <MobileTop {index} toggleMenu={toggleSettings} />
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
