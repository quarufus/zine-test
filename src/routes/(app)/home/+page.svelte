<script>
  import Pages from "$lib/Pages.svelte";
  import SinglePage from "$lib/SinglePage.svelte";
  import Home from "$lib/pages/Home.svelte";
  import { setIndex } from "$lib/stores";

  setIndex(0);
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
  <meta
    name="description"
    content="Home page for To Bitoni, a webzine focused on art"
  />
</svelte:head>

{#if innerWidth > 900}
  <Pages>
    <div slot="left" />
    <Home slot="right" />
  </Pages>
{:else}
  <SinglePage>
    <Home slot="content" />
  </SinglePage>
{/if}
