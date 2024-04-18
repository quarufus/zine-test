<script>
	import IssueaNav from '$lib/IssueaNav.svelte';
	import Pages from '$lib/Pages.svelte';
	import Settings from '$lib/Settings.svelte';
	import VerticalRule from '$lib/VerticalRule.svelte';

	let settings = false;

	function toggleSettings() {
		settings = !settings;
	}

	export let data;
</script>

{#if settings}
	<Settings {toggleSettings} {innerWidth} />
{/if}
<IssueaNav title={data.slug} {toggleSettings} />
<VerticalRule />
<Pages>
	<h1 slot="left">O</h1>
	<h1 slot="right">{data.slug}</h1>
</Pages>

<style>
	:root {
		background-color: var(--bg);
	}
	:global(body) {
		margin: 0;
	}
</style>
