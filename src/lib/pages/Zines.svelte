<script>
    import { createScrollArea, melt } from "@melt-ui/svelte";
    let zines = ["One", "Two", "Three", "Four", "Five"];

    const {
        elements: { root, content, viewport, corner, scrollbarY, thumbY },
    } = createScrollArea({
        type: "scroll",
        dir: "ltr",
    });
</script>

<div
    use:melt={$root}
    id="fuck"
    class="relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
>
    <div use:melt={$viewport} class="h-full w-full">
        <div use:melt={$content}>
            <div class="p-10">
                <h1 class="p-[5px]">Περιοδικά</h1>
                <div
                    class="grid grid-cols-2 sm:grid-cols-3 min-[900px]:grid-cols-2 max-[450px]:grid-cols-1 xl:grid-cols-3"
                >
                    {#each zines as zine}
                        <button
                            class="m-2.5 p-2.5 h-68 border-2-solid-black cursor-pointer"
                            on:click={() => {
                                location.href = "/zines/" + zine;
                            }}
                        >
                            {zine}
                        </button>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div
        use:melt={$scrollbarY}
        class="flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors"
    >
        <div use:melt={$thumbY} class="relative flex-1 rounded-full bg-black" />
    </div>
    <div use:melt={$corner} />
</div>

<style>
    button {
        border: 2px solid black;
        height: 17rem;
    }
    #fuck {
        height: calc(100dvh - 71px);
    }
</style>
