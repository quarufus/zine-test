<script>
	import Pages from '$lib/Pages.svelte';
	import SinglePage from '$lib/SinglePage.svelte';
    import Home from '$lib/pages/Home.svelte';
    import Zines from '$lib/pages/Zines.svelte';
	import { setIndex } from '$lib/stores';
	import { createScrollArea, melt } from '@melt-ui/svelte';

	setIndex(1);
	let zines = ['One', 'Two', 'Three', 'Four', 'Five'];
	$: innerWidth = 0;

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'scroll',
		dir: 'ltr',
	});
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<Home slot="left"/>
		<div slot="right" class="m-0">
			<div use:melt={$root} id="fuck" class="relative h-[calc(100dvh - 71px)] w-full overflow-hidden">
				<div use:melt={$viewport} class="h-full w-full">
					<div use:melt={$content}>
						<Zines/>
					</div>
				</div>
				<div use:melt={$scrollbarY} class="flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors">
					<div use:melt={$thumbY} class="relative flex-1 rounded-full bg-black"/>
				</div>
				<div use:melt={$corner}/>
			</div>
		</div>
	</Pages>
{:else}
	<SinglePage>
		<Zines slot="content"/>
	</SinglePage>
{/if}

<style>
	#fuck {
		height: calc(100dvh - 71px);
	}
</style>
