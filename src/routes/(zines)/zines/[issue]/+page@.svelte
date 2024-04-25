<script lang="ts">
	import IssueaNav from "$lib/IssueaNav.svelte";
	import Settings from "$lib/Settings.svelte";
	import VerticalRule from "$lib/VerticalRule.svelte";
	import { onMount } from "svelte";
	import One from "$lib/zines/One.html?raw";
	import { paginate } from "$lib/paginate.js";
	import MobileFooter from "$lib/MobileFooter.svelte";

	let settings = false;
	$: innerWidth = 0;
	let index = 0;
	let root;
	$: textSize = [30];
	let mounted = false;
	$: navINdex = 0;
	$: if (innerWidth > 900) {
		navINdex = index * 2;
	} else {
		navINdex = index;
	}
	$: font = "Inter";

	export let data;

	let content = One;

	$: length = 100;

	$: if (mounted) {
		length = paginate(content, index, textSize);
	}

	function toggleSettings() {
		settings = !settings;
	}

	function next() {
		if (index < length) {
			index++;
			paginate(content, index, textSize);
		}
	}
	function previous() {
		if (index > 0) {
			index--;
			paginate(content, index, textSize);
		}
	}

	onMount(() => {
		mounted = true;

		length = paginate(content, index, textSize);

		const resizeObserver = new ResizeObserver(() => {
			length = paginate(content, index, textSize);
		});

		resizeObserver.observe(root);

		return () => resizeObserver.unobserve(root);
	});
</script>

<svelte:window bind:innerWidth />

{#if settings}
	<Settings {toggleSettings} {innerWidth} bind:size={textSize} bind:font />
{/if}
<IssueaNav
	title={data.slug}
	{toggleSettings}
	{next}
	{previous}
	index={navINdex}
	bind:length
/>
{#if innerWidth > 900}
	<VerticalRule />
{:else}
	<MobileFooter {index} />
{/if}
<div class="root_container" style="--font: {font};" bind:this={root}></div>

<style>
	:root {
		background-color: var(--bg);
	}
	:global(body) {
		margin: 0;
	}
	.root_container {
		display: flex;
		height: calc(100dvh - 70px);
		width: 100%;
		top: 70px;
		position: relative;
		overflow-x: hidden;
		font-family: var(--font);
	}
</style>
