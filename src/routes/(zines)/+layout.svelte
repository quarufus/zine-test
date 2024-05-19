<script lang="ts">
	import Top from "$lib/Top.svelte";
	import MobileTop from "$lib/MobileTop.svelte";
	import Menu from "$lib/Menu.svelte";
	import MobileFooter from "$lib/MobileFooter.svelte";
	import VerticalRule from "$lib/VerticalRule.svelte";
	import { store, setIndex } from "$lib/stores";
	import { onDestroy } from "svelte";

	let index = setIndex(0);

	const unsubscribeIndex = store.subscribe(() => {
		index = index;
	});

	$: innerWidth = 0;
	$: menu = false;
	function toggleMenu() {
		menu = !menu;
	}
	const pages = ["Home", "Zines", "About", "Contact", "End"];
	onDestroy(unsubscribeIndex);
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>To Bitoni | {pages[$store.index]}</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Courier Prime"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Abhaya Libre"
	/>
</svelte:head>

<main class="h-full">
	{#if menu}
		<Menu {toggleMenu} {innerWidth} />
	{/if}
	{#if innerWidth > 900}
		<Top {toggleMenu} bind:index={$store.index} />
		<VerticalRule />
		<slot />
	{:else}
		<MobileTop {toggleMenu} button="Menu" />
		<slot />
		<MobileFooter bind:index={$store.index} />
	{/if}
</main>

<style>
	:root {
		background-color: var(--bg);
	}
	:global(body) {
		margin: 0;
	}
</style>
