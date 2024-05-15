<script>
    import img from "$lib/images/unnamed.png";
    let zines = ["One", "Two", "Three", "Four", "Five"];
</script>

<div class="p-10" style="--img: {img}">
    <h1 class="p-[5px]">Περιοδικά</h1>
    <div
        class="grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 xl:grid-cols-3"
    >
        {#each zines as zine}
            <button
                class="m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer"
                style:background-image="{img} cover"
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
        background-image: var(--img) cover;
    }
</style>
