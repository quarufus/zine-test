<script>
  import { _ } from "svelte-i18n";
  let zines = ["One", "Two", "Three", "Four", "Five"];
</script>

<div class="p-10">
  <h1 class="my-5">{$_("zines_page.content.heading")}</h1>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 max-[450px]:grid-cols-1 xl:grid-cols-3 mx-[-10px]"
  >
    {#each zines as zine}
      <button
        class="m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer text-center"
        on:click={() => {
          location.href = "/zines/" + zine;
        }}
      >
        {zine}
      </button>
    {/each}
  </div>
</div>

<style>
  button {
    border: 2px solid black;
    height: 17rem;
  }
</style>
