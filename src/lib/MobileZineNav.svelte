<script>
  export let index;
  export let next;
  export let previous;
  export let length;
</script>

<ul>
  <li class="left">
    {#if index > 0}
      <button on:click={previous}>&lt- Previous</button>
    {/if}
  </li>
  <li class="right">
    {#if index < length - 1}
      <button on:click={next}>Next -></button>
    {/if}
  </li>
</ul>

<style>
  ul {
    list-style: none;
    display: flex;
    border-top: var(--border);
    margin: 0;
    padding: 0;
    bottom: 0;
    position: fixed;
    width: 100dvw;
    height: 50px;
    background-color: var(--bg);
    z-index: 1;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
    align-items: right;
  }
  li {
    padding: 10px;
    float: left;
    width: 50%;
    font-weight: 500;
  }
</style>
