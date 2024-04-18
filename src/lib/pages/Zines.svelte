<script>
    let zines = ['One', 'Two', 'Three', 'Four', 'Five'];
</script>

<div class="p-[5px]">
<h1 class="p-[5px]">Zines</h1>
<div class="flex flex-wrap flex-row justify-start">
    {#each zines as zine}
        <button
            class="m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer"
            on:click={() => {
                location.href = '/zines/' + zine;
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
        width: calc(33.3% - 44px);
        height: 17rem;
    }
</style>