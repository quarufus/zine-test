<script>
	import { DoorOpen } from "lucide-svelte";
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
	<li id="one">
		{#if index > 0}
			<button on:click={previous}>&lt- Previous</button>
		{/if}
	</li>
	<li class="right cent" id="sett">
		<button
			class="p-0"
			on:click={() => {
				location.href = "/zines";
			}}><DoorOpen /></button
		>
		<button on:click={toggleSettings}>Options</button>
	</li>
	<li class="left cent">Issue {title} | {index + 2}</li>
	<li class="right" id="last">
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
		padding-bottom: 4px;
		position: fixed;
		width: 100%;
		z-index: 10;
		border-bottom: 5px solid var(--accent);
		height: 64px;
	}
	button {
		border: none;
		padding-bottom: 5px;
	}
	button:hover {
		border-bottom: 5px solid black;
		padding-bottom: 0px;
	}
	.cent {
		padding: 20px 50px 0 50px;
	}
	.left {
		text-align: left;
	}
	.right {
		text-align: right;
		align-items: right;
	}
	li {
		float: left;
		width: 25%;
		font-weight: 500;
	}
	#one {
		padding: 20px 20px 0 10%;
	}
	#last {
		padding: 20px 10% 0 20px;
	}
	#sett > button {
		float: right;
		margin-left: 50px;
	}
</style>
