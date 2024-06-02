<script lang="ts">
	import Pages from "$lib/Pages.svelte";
	import SinglePage from "$lib/SinglePage.svelte";
	import About from "$lib/pages/About.svelte";
	import { setIndex } from "$lib/stores";
	import { createScrollArea, melt } from "@melt-ui/svelte";
	import Zines from "$lib/pages/Zines.svelte";

	setIndex(2);
	let innerWidth: number;

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
		<div slot="left"></div>
		<About slot="right" />
	</Pages>
{:else}
	<SinglePage>
		<About slot="content" />
	</SinglePage>
{/if}

<style>
</style>
