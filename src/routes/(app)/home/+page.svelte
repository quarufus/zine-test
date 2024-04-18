<script>
	import Pages from '$lib/Pages.svelte';
	import SinglePage from '$lib/SinglePage.svelte';
	import { setIndex } from '$lib/stores';

	setIndex(0);
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<h1 slot="right">Home</h1>
	</Pages>
{:else}
	<SinglePage>
		<h1 slot="content">Home</h1>
	</SinglePage>
{/if}

<style>
	h1 {
		margin: 50px 10px;
	}
</style>
