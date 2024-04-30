<script>
	import IssueaNav from "$lib/IssueaNav.svelte";
	import { setFontSize } from "$lib/stores";

	setFontSize(30);

	export let data;
</script>

<svelte:head>
	<title>To Bitoni | {data.slug}</title>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter" />
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Courier Prime"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Abhaya Libre"
	/>
</svelte:head>

<IssueaNav title={data.slug} />
<slot />
