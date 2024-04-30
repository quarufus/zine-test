<script lang="ts">
	import IssueaNav from "$lib/IssueaNav.svelte";
	import Settings from "$lib/Settings.svelte";
	import VerticalRule from "$lib/VerticalRule.svelte";
	import { onDestroy, onMount } from "svelte";
	import One from "$lib/zines/One.html?raw";
	import { paginate } from "$lib/paginate.js";
	import MobileZineNav from "$lib/MobileZineNav.svelte";
	import MobileTop from "$lib/MobileTop.svelte";
	import { setFontSize, readerSettings, setFontFamily } from "$lib/stores";

	$: settings = $readerSettings;

	const unsubscribe = readerSettings.subscribe((value) => {
		settings = settings;
	});

	let showSettings = false;
	$: innerWidth = 0;
	let index = 0;
	let root;
	$readerSettings.fontSize = 30;
	$readerSettings.fontFamily = "Inter";

	console.log($readerSettings);
	$: textSize = [$readerSettings.fontSize];
	console.log($readerSettings.fontSize);
	let mounted = false;
	$: navINdex = 0;
	$: if (innerWidth > 900) {
		navINdex = index * 2;
	} else {
		navINdex = index;
	}
	$: font = $readerSettings.fontFamily;
	console.log(font);

	export let data;

	let content = One;

	$: length = 100;

	$: if (mounted) {
		length = paginate(content, index, textSize, font);
	}

	function toggleSettings() {
		showSettings = !showSettings;
	}

	function next() {
		if (index < length) {
			index++;
			paginate(content, index, textSize, font);
		}
	}
	function previous() {
		if (index > 0) {
			index--;
			paginate(content, index, textSize, font);
		}
	}

	onMount(() => {
		mounted = true;

		length = paginate(content, index, textSize, font);
		console.log($readerSettings);

		const resizeObserver = new ResizeObserver(() => {
			length = paginate(content, index, textSize, font);
		});

		resizeObserver.observe(root);

		return () => resizeObserver.unobserve(root);
	});
	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>To Bitoni | {data.slug}</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Fira Code"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Literata"
	/>
</svelte:head>

{#if showSettings}
	<Settings
		{toggleSettings}
		{innerWidth}
		bind:size={$readerSettings.fontSize}
		bind:font={$readerSettings.fontFamily}
	/>
{/if}
{#if innerWidth > 900}
	<IssueaNav
		title={data.slug}
		{toggleSettings}
		{next}
		{previous}
		index={navINdex}
		bind:length
	/>
	<VerticalRule />
{:else}
	<MobileTop {index} toggleMenu={toggleSettings} />
	<MobileZineNav {index} {next} {previous} {length} />
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
		height: calc(100dvh - 100px);
		width: 100%;
		top: 70px;
		position: relative;
		overflow-x: hidden;
		padding: 0 10%;
	}
	@media only screen and (min-width: 900) {
		.root_container {
			height: calc(100dvh - 140px);
		}
	}
</style>
