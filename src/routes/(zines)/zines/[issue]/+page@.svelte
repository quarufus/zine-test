<script lang="ts">
  import IssueaNav from "$lib/IssueaNav.svelte";
  import Settings from "$lib/Settings.svelte";
  import VerticalRule from "$lib/VerticalRule.svelte";
  import { onDestroy, onMount } from "svelte";
  import One from "$lib/zines/One.html?raw";
  import { getChunks } from "$lib/pages";
  import MobileZineNav from "$lib/MobileZineNav.svelte";
  import MobileTop from "$lib/MobileTop.svelte";
  import { readerSettings } from "$lib/stores";
  import First from "$lib/zines/One.svelte";

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
  $: font = $readerSettings.fontFamily;
  $: fontSize = $readerSettings.fontSize;

  export let data;

  let chunks: HTMLElement[];
  $: chunks = [];
  $: length = chunks.length;
  let root_container: HTMLElement;

  $: if (mounted) {
    index;
    chunks;
    //chunks = paginate(content, textSize, font);
    //console.log(chunks);
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
      //paginate(content, index, textSize, font);
    }
  }
  function previous() {
    if (index > 0) {
      index--;
      //paginate(content, index, textSize, font);
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

    chunks = getChunks(font, fontSize); //paginate(content, textSize, font);
    //console.log(chunks);

    root_container = document.getElementById("root_container")!;

    //console.log($readerSettings);

    const resizeObserver = new ResizeObserver(() => {
      chunks = getChunks(font, fontSize); //paginate(content, textSize, font);
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
    bind:size={$readerSettings.fontSize}
    bind:font={$readerSettings.fontFamily}
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
<!--<div id="source">{@html One}</div>-->
<!--<div id="render"></div>-->
<!--<div
  class="root_container"
  id="root_container"
  style="--font: {font};"
  bind:this={root}
></div>-->
<p class="page fullPage" style="display: none;"></p>

<First />

<style>
  :root {
    background-color: var(--bg);
  }
  :global(body) {
    margin: 0;
  }
  p {
    font-size: var(--fontSize);
    font-family: var(--fontFamily);
  }
  .page {
    border-top: 1px solid blue;
    color: red;
    height: calc(100vh - 100px);
    padding: 10px;
  }
  #source {
    position: absolute;
    top: -30000px;
    height: calc(100vh - 100px);
    width: calc(100vw / 2);
  }
  #render {
    position: absolute;
    top: -30000px;
    height: calc(100vh - 100px);
  }
  .root_container {
    display: flex;
    height: 100dvh;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    /*padding: 70px 10% 20px 10%;*/
    text-align: justify;
    line-height: 1.5;
  }
  @media only screen and (max-width: 900px) {
    .root_container {
      height: calc(100dvh - 140px);
    }
  }
  .fullPage {
    height: 100%;
    position: absolute;
    width: 50%;
    left: 0;
    top: 0;
  }
</style>
