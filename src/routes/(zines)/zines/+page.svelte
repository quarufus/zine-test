<script>
	import Pages from "$lib/Pages.svelte";
	import SinglePage from "$lib/SinglePage.svelte";
	import Home from "$lib/pages/Home.svelte";
	import Zines from "$lib/pages/Zines.svelte";
	import { setIndex } from "$lib/stores";
	import { createScrollArea, melt } from "@melt-ui/svelte";

	setIndex(1);
	let zines = ["One", "Two", "Three", "Four", "Five"];
	$: innerWidth = 0;

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: "scroll",
		dir: "ltr",
	});
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<Home slot="left" />
		<div slot="right" class="m-0">
			<Zines />
		</div>
	</Pages>
{:else}
	<SinglePage>
		<Zines slot="content" />
	</SinglePage>
{/if}

<style>
	#fuck {
		height: calc(100dvh - 71px);
	}
</style>
