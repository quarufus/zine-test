<script lang="ts">
	import Pages from '$lib/Pages.svelte';
	import SinglePage from '$lib/SinglePage.svelte';
    import About from '$lib/pages/About.svelte';
	import { setIndex } from '$lib/stores';
	import { createScrollArea, melt } from '@melt-ui/svelte';
	import Zines from '$lib/pages/Zines.svelte';

	setIndex(2);
	let zines = ['One', 'Two', 'Three', 'Four', 'Five'];
	let innerWidth: number;

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
		<div slot="left" class="m-0">
			<div use:melt={$root} id="fuck" class="relative h-70 w-full overflow-hidden">
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
		<About slot="right"/>
	</Pages>
{:else}
	<SinglePage>
		<About slot="content"/>
	</SinglePage>
{/if}

<style>
	#fuck {
		height: calc(100dvh - 71px);
	}
</style>
