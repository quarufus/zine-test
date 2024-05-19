<script lang="ts">
	import Top from "$lib/Top.svelte";
	import MobileTop from "$lib/MobileTop.svelte";
	import Menu from "$lib/Menu.svelte";
	import MobileFooter from "$lib/MobileFooter.svelte";
	import VerticalRule from "$lib/VerticalRule.svelte";
	import { store, setIndex } from "$lib/stores";
	import { createScrollArea, melt } from "@melt-ui/svelte";

	let index = setIndex(0);

	const unsubscribeIndex = store.subscribe((value) => {
		index = index;
	});

	$: innerWidth = 0;
	$: menu = false;
	function toggleMenu() {
		menu = !menu;
	}

	function next() {
		location.href = pages[$store.index + 1].toLowerCase();
	}

	function previous() {
		location.href = pages[$store.index - 1].toLowerCase();
	}

	const pages = ["Home", "Zines", "About", "Contact", "End"];

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: "scroll",
		dir: "ltr",
	});
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<title>To Bitoni | {pages[$store.index]}</title>
</svelte:head>

<main>
	{#if menu}
		<Menu {toggleMenu} {innerWidth} />
	{/if}
	{#if innerWidth > 900}
		<Top {toggleMenu} bind:index={$store} />
		<VerticalRule />
		<slot />
	{:else}
		<MobileTop {toggleMenu} title={pages[$store.index]} />
		<div
			use:melt={$root}
			id="fuck"
			class="relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
		>
			<div use:melt={$viewport} class="h-full w-full">
				<div use:melt={$content}>
					<slot />
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
		<MobileFooter bind:index={$store.index} {next} {previous} />
	{/if}
</main>

<style>
	:root {
		background-color: var(--bg);
	}
	:global(body) {
		margin: 0;
	}
	#fuck {
		height: calc(100dvh - 70px);
	}
</style>
