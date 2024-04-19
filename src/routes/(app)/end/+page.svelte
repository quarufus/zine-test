<script>
	import Pages from "$lib/Pages.svelte";
	import Contact from "$lib/pages/Contact.svelte";
	import { setIndex } from "$lib/stores";
	import SinglePage from "$lib/SinglePage.svelte";
	import BackCover from "$lib/pages/BackCover.svelte";

	setIndex(4);
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<Contact slot="left" />
	</Pages>
{:else}
	<SinglePage>
		<BackCover slot="content" />
	</SinglePage>
{/if}
