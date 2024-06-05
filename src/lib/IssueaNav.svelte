<script>
	import { DoorClosed } from "lucide-svelte";
	import { DoorOpen } from "lucide-svelte";
	import { onMount } from "svelte";
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
	let hover = false;

	onMount(() => {
		const icon = document.getElementById("icon");
		icon?.addEventListener("mouseover", () => {
			hover = true;
		});
		icon?.addEventListener("mouseout", () => {
			hover = false;
		});
	});
</script>

<svelte:window bind:innerWidth />

<ul>
	<li id="one" class="w-[25%]">
		{#if index > 0}
			<button on:click={previous}>&lt- Previous</button>
		{/if}
	</li>
	<li class="right cent w-[25%]" id="sett">
		<button on:click={toggleSettings}>Options</button>
	</li>
	<li class="left cent w-[25%]" id="title">Issue {title}</li>
	<li class="right w-[15%]" id="last">
		{#if index < myLength - 1}
			<button on:click={next}>Next -></button>
		{/if}
	</li>
	<li class="right w-[10%]" id="exit">
		<button
			id="icon"
			title="Close"
			class="p-0"
			on:click={() => {
				location.href = "/zines";
			}}
		>
			{#if hover}
				<DoorOpen />
			{:else}
				<DoorClosed />
			{/if}
		</button>
	</li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		margin: 0;
		padding-bottom: 4px;
		position: fixed;
		width: 100%;
		z-index: 10;
		/*border-bottom: 5px solid var(--accent);*/
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
	/*
	li {
		float: left;
		font-weight: 500;
	}
	*/
	#one {
		padding: 20px 0 0 0;
		width: 15%;
		margin-left: 10%;
	}
	#last {
		padding: 20px 0 0 20px;
	}
	#sett > button {
		float: right;
		margin-left: 50px;
	}
	#exit {
		padding: 20px 2% 0 2%;
	}
	#one,
	#sett,
	#title,
	#last {
		border-bottom: 2px solid black;
		padding-bottom: 5px;
	}
</style>
