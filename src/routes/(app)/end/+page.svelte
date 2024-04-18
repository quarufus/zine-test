<script>
	import Pages from '$lib/Pages.svelte';
    import Contact from '$lib/pages/Contact.svelte';
	import { setIndex } from '$lib/stores';

	setIndex(4);
</script>

<Pages>
	<Contact slot="left"/>
</Pages>