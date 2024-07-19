<script lang="ts">
  import { page } from "$app/stores";
  import { _ } from "svelte-i18n";

  export let index: number;
  const values = ["home", "zines", "about", "contact"];
  $: title = [
    $_("nav.home"),
    $_("nav.zines"),
    $_("nav.about"),
    $_("nav.contact"),
  ];
</script>

<div id="ul">
  <div class="arrow" id="left">
    {#if index > 0}
      {#if title[index] == "Start"}
        <a href="/home">&lt- {title[index]}</a>
      {:else}
        <a href="/{values[index - 1].toLowerCase()}">&lt- {title[index - 1]}</a>
      {/if}
    {/if}
  </div>
  <div>
    <a href="./home" class:active={$page.url.pathname.includes("/home")}
      >{$_("nav.home")}</a
    >
  </div>
  <div>
    <a href="./zines" class:active={$page.url.pathname.includes("/zines")}
      >{$_("nav.zines")}</a
    >
  </div>
  <div>
    <a href="./about" class:active={$page.url.pathname.includes("/about")}
      >{$_("nav.about")}</a
    >
  </div>
  <div>
    <a href="./contact" class:active={$page.url.pathname.includes("/contact")}
      >{$_("nav.contact")}</a
    >
  </div>
  <div class="arrow" id="right">
    {#if index < 3}
      <a href="/{values[index + 1].toLowerCase()}">{title[index + 1]} -&gt</a>
    {/if}
  </div>
</div>

<style>
  #ul {
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr) 2fr;
    flex-flow: row nowrap;
    z-index: 12;
    width: 100%;
    justify-content: space-between;
    border-bottom: var(--border);
    height: 64px;
    backdrop-filter: blur(10px);
    position: absolute;
  }
  div:has(> a.active) {
    background-color: black;
  }
  div:has(> div) .active {
    color: white;
  }
  #ul > div {
    padding: 20px;
    flex-grow: 1;
    text-align: center;
  }
  #ul > .arrow {
    flex-grow: 2;
  }
  #ul > #left {
    text-align: left;
  }
  #ul > #right {
    text-align: right;
  }
  a {
    border: none;
  }
  a:hover {
    border-bottom: 5px solid black;
  }
  .active:hover {
    border-bottom: 5px solid white;
  }
</style>
