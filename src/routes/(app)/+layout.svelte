<script lang="ts">
	import Top from "$lib/Nav.svelte";
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

	$: innerWidth = 901;
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
	<meta property="og:description" content="A magazine" />
</svelte:head>

<main>
	{#if menu}
		<Menu {toggleMenu} {innerWidth} />
	{/if}
	{#if innerWidth > 900}
		<Top bind:index={$store.index} />
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
