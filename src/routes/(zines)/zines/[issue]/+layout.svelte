<script>
	import IssueaNav from "$lib/IssueaNav.svelte";
	import { setFontSize } from "$lib/stores";

	setFontSize(30);

	export let data;
</script>

<IssueaNav title={data.slug} />
<slot />
