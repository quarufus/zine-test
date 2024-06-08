<script>
	import Pages from "$lib/Pages.svelte";
	import SinglePage from "$lib/SinglePage.svelte";
	import Home from "$lib/pages/Home.svelte";
	import swan from "$lib/zines/swan.jpg";
	import Zines from "$lib/pages/Zines.svelte";
	import { setIndex } from "$lib/stores";
	import { createScrollArea, melt } from "@melt-ui/svelte";

	setIndex(1);
	let zines = ["One", "Two", "Three", "Four", "Five"];
	$: innerWidth = 901;

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: "scroll",
		dir: "ltr",
	});
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<meta
		name="description"
		content="Zines page for To Bitoni, a webzine focused on art"
	/>
</svelte:head>

{#if innerWidth > 900}
	<Pages>
		<!--<div slot="left" style:background-image={swan} />-->
		<div slot="left" class="left">
			<img
				src={swan}
				alt="swan"
				class="object-cover object-top w-full h-full mt-[-64px]"
			/>
		</div>
		<div slot="right" class="m-0">
			<div
				use:melt={$root}
				id="fuck"
				class="relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
			>
				<div use:melt={$viewport} class="h-full w-full">
					<div use:melt={$content}>
						<Zines />
					</div>
				</div>
				<div
					use:melt={$scrollbarY}
					class="flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors"
				>
					<div
						use:melt={$thumbY}
						class="relative flex-1 rounded-full bg-black"
					/>
				</div>
				<div use:melt={$corner} />
			</div>
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
	.left {
		height: 100vh;
	}
</style>
