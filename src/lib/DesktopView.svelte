<script lang="ts">
  import Top from "./Top.svelte";
  import VerticalRule from "./VerticalRule.svelte";
  import Pages from "./Pages.svelte";

  export let toggleMenu;
  export let index: number;
  export let next;
  export let previous;
  export let pages: Array<String>;
</script>

<Top {index} {next} {previous} {toggleMenu} />
<VerticalRule />
{#if index == 0}
  <Pages>
    <h1 slot="right">{pages[0]}</h1>
  </Pages>
{:else if index == 1}
  <Pages>
    <h1 slot="left">{pages[0]}</h1>
    <h1 slot="right">{pages[1]}</h1>
  </Pages>
{:else if index == 2}
  <Pages>
    <h1 slot="left">{pages[1]}</h1>
    <h1 slot="right">{pages[2]}</h1>
  </Pages>
{:else if index == 3}
  <Pages>
    <h1 slot="left">{pages[2]}</h1>
    <h1 slot="right">{pages[3]}</h1>
  </Pages>
{:else if index == 4}
  <Pages>
    <h1 slot="left">{pages[3]}</h1>
  </Pages>
{/if}
