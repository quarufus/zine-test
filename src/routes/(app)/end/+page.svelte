<script>
	import Pages from '$lib/Pages.svelte';
	import { setIndex } from '$lib/stores';

	setIndex(4);
</script>

<Pages>
	<h1 slot="left">Contact</h1>
</Pages>

<style>
	h1 {
		margin: 50px 10px;
	}
</style>
