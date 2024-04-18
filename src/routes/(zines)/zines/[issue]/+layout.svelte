<script>
	import IssueaNav from '$lib/IssueaNav.svelte';
	export let data;
</script>

<IssueaNav title={data.slug} />
<slot />
