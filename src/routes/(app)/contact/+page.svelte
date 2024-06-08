<script>
	import Pages from "$lib/Pages.svelte";
	import { setIndex } from "$lib/stores";
	import SinglePage from "$lib/SinglePage.svelte";
	import About from "$lib/pages/About.svelte";
	import Contact from "$lib/pages/Contact.svelte";

	setIndex(3);
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	<meta
		name="description"
		content="Contact page for To Bitoni, a webzine focused on art"
	/>
</svelte:head>

{#if innerWidth > 900}
	<Pages>
		<div slot="left" />
		<Contact slot="right" />
	</Pages>
{:else}
	<SinglePage>
		<Contact slot="content" />
	</SinglePage>
{/if}
