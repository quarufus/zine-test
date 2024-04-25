<script>
	export let title;
	export let toggleSettings;
	export let next;
	export let previous;
	export let index;
	export let length;

	$: innerWidth = 0;
	$: myLength = length;
	$: if (innerWidth > 900 && length % 2 == 0) {
		myLength = length - 1;
	}
</script>

<svelte:window bind:innerWidth />

<ul>
	<li>
		{#if index > 0}
			<button on:click={previous}>&lt- Previous</button>
		{/if}
	</li>
	<li class="right"><button on:click={toggleSettings}>Settings</button></li>
	<li class="left">Issue {title} | {index + 2}</li>
	<li class="right">
		{#if index < myLength - 1}
			<button on:click={next}>Next -></button>
		{/if}
	</li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-bottom: 0px solid black;
		margin: 0;
		padding: 0;
		position: fixed;
		width: 100%;
	}
	.left {
		text-align: left;
	}
	.right {
		text-align: right;
		align-items: right;
	}
	li {
		padding: 20px 100px;
		float: left;
		width: 25%;
		font-weight: 500;
	}
</style>
