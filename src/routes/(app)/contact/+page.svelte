<script>
	import Pages from '$lib/Pages.svelte';
	import { setIndex } from '$lib/stores';
	import SinglePage from '$lib/SinglePage.svelte';

	setIndex(3);
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<h1 slot="left">About</h1>
		<h1 slot="right">Contact</h1>
	</Pages>
{:else}
	<SinglePage>
		<h1 slot="content">Contact</h1>
	</SinglePage>
{/if}

<style>
	h1 {
		margin: 50px 10px;
	}
</style>
