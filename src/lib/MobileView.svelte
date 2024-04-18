<script lang="ts">
  import MobileFooter from "./MobileFooter.svelte";
  import MobileTop from "./MobileTop.svelte";
  import SinglePage from "./SinglePage.svelte";

  export let toggleMenu;
  export let index: number;
  export let next;
  export let previous;
  export let pages: Array<String>;
</script>

<MobileTop {toggleMenu} {index} />
{#if index == 0}
  <SinglePage>
    <h1 slot="content">{pages[0]}</h1>
  </SinglePage>
{:else if index == 1}
  <SinglePage>
    <h1 slot="content">{pages[1]}</h1>
  </SinglePage>
{:else if index == 2}
  <SinglePage>
    <h1 slot="content">{pages[2]}</h1>
  </SinglePage>
{:else if index == 3}
  <SinglePage>
    <h1 slot="content">{pages[3]}</h1>
  </SinglePage>
{/if}
<MobileFooter {index} {next} {previous} />
