<script lang="ts">
  import { page } from "$app/stores";

  export let index: number;
  const title = ["Start", "Home", "Zines", "About", "Contact", "End"];
  $: left = index == 0 ? true : false;
  $: right = index == 3 ? true : false;
</script>

<div id="ul">
  <div class="arrow" id="left">
    <a class:active={left} />
    {#if index > 0}
      {#if title[index] == "Start"}
        <a href="/home">&lt- {title[index]}</a>
      {:else}
        <a href="/{title[index].toLowerCase()}">&lt- {title[index]}</a>
      {/if}
    {/if}
  </div>
  <div>
    <a href="./home" class:active={$page.url.pathname.includes("/home")}
      >To Bitoni</a
    >
  </div>
  <div>
    <a href="./zines" class:active={$page.url.pathname.includes("/zines")}
      >Zines</a
    >
  </div>
  <div>
    <a href="./about" class:active={$page.url.pathname.includes("/about")}
      >About</a
    >
  </div>
  <div>
    <a href="./contact" class:active={$page.url.pathname.includes("/contact")}
      >Contact</a
    >
  </div>
  <div class="arrow" id="right">
    <a class:active={right} />
    {#if index < 3}
      <a href="/{title[index + 2].toLowerCase()}">{title[index + 2]} -&gt</a>
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
  }
  div:has(> a.active) {
    background-color: black;
  }
  .active {
    font-weight: 900;
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
  a:active {
    font-weight: 900;
  }
</style>
