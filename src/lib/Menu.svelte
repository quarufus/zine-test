<script lang="ts">
  import LocaleSwitcher from "./components/LocaleSwitcher.svelte";
  import { onMount } from "svelte";
  import { locale } from "svelte-i18n";

  export let toggleMenu;
  export let innerWidth: number;
  let mounted = false;

  let width: number;

  $: if (innerWidth > 900) {
    width = 50;
  } else {
    width = 100;
  }

  let myLocale: string = "Greek";
  $: if (mounted) locale.set(myLocale);
  onMount(() => {
    mounted = true;
  });
</script>

<div style="--width: {width}%" class="top-0">
  <button id="close" on:click={toggleMenu}>Close</button>
  <ul class="p-20">
    <li><a href="/home" on:click={toggleMenu}>Home</a></li>
    <li><a href="/zines" on:click={toggleMenu}>Zines</a></li>
    <li><a href="/about" on:click={toggleMenu}>About</a></li>
    <li><a href="/contact" on:click={toggleMenu}>Contact</a></li>
    <li><LocaleSwitcher bind:value={myLocale} /></li>
  </ul>
</div>

<style>
  div {
    width: calc(var(--width) - 1px);
    position: absolute;
    height: 100%;
    background-color: var(--bg);
    z-index: 12;
    text-align: left;
  }
  ul {
    list-style: none;
    font-size: 11vmin;
  }
  #close {
    text-align: right;
    margin: 21px 19px;
    float: right;
  }
</style>
