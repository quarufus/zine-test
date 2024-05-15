<script lang="ts">
  import Unnamed from "$lib/zines/unnamed.png";
  import content from "$lib/zines/One.html?raw";
  import { paginate } from "$lib/paginate";
  import { readerSettings } from "$lib/stores";
  import { onMount, onDestroy } from "svelte";

  $: settings = $readerSettings;

  const unsubscribe = readerSettings.subscribe((value) => {
    settings = settings;
  });

  let showSettings: boolean = false;
  $: innerWidth = 0;
  let index: number = 0;
  let root: Element;
  $readerSettings.fontSize = 30;
  $readerSettings.fontFamily = "Inter";

  //console.log($readerSettings);
  $: textSize = [$readerSettings.fontSize];
  //console.log($readerSettings.fontSize);
  let mounted = false;
  $: navINdex = 0;
  $: if (innerWidth > 900) {
    navINdex = index * 2;
  } else {
    navINdex = index;
  }
  $: font = $readerSettings.fontFamily;
  //console.log(font);

  //export let data;

  $: length = 100;

  $: if (mounted) {
    length = paginate(content, index, textSize, font);
  }

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

  onMount(() => {
    mounted = true;

    length = paginate(content, index, textSize, font);
    //console.log($readerSettings);

    const resizeObserver = new ResizeObserver(() => {
      length = paginate(content, index, textSize, font);
    });

    resizeObserver.observe(root);

    return () => resizeObserver.unobserve(root);
  });
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="root_container" style="--font: {font};" bind:this={root}></div>

<style>
  .root_container {
    display: flex;
    height: calc(100dvh - 100px);
    width: 100%;
    top: 70px;
    position: relative;
    overflow-x: hidden;
    padding: 0 10%;
  }
  @media only screen and (min-width: 900) {
    .root_container {
      height: calc(100dvh - 140px);
    }
  }
</style>
