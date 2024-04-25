<script lang="ts">
	import { createSlider, melt } from "@melt-ui/svelte";
	import { createEventDispatcher } from "svelte";
	import FontSelect from "./FontSelect.svelte";

	const dispach = createEventDispatcher();

	export let toggleSettings;
	export let innerWidth: number;
	export let size;
	export let font;

	let width: number;
	$: textSize = $value;

	$: {
		dispach("fontChange", { textSize });
		size = textSize;
	}

	$: if (innerWidth > 900) {
		width = 50;
	} else {
		width = 100;
	}

	const {
		elements: { root, range, thumbs },
		states: { value },
	} = createSlider({
		defaultValue: size,
		min: 10,
		max: 70,
	});

	size = textSize;
</script>

<div style="--width: {width}%; --font: {font};" class="h-dvh">
	<button
		id="exit"
		on:click={() => {
			location.href = "/zines";
		}}>Exit</button
	>
	<button id="close" on:click={toggleSettings}>Close</button>
	<ul class="h-dvh py-25 py-100 px-10 text-[11vmin]">
		<li>
			<FontSelect bind:font />
		</li>
		<br />
		<li><h2>Text size: {textSize}</h2></li>
		<li>
			<span use:melt={$root} class="relative flex h-[20px] w-full items-center">
				<span class="h-[3px] w-full bg-black">
					<span use:melt={$range} class="h-[3px] bg-black" />
				</span>
				<span
					use:melt={$thumbs[0]}
					aria-label="Text size"
					class="h-5 w-5 rounded-full bg-black cursor-pointer"
				/>
			</span>
		</li>
		<br />
		<li><h2>Text spacing</h2></li>
		<li></li>
	</ul>
</div>

<style>
	div {
		width: calc(var(--width) - 1px);
		position: absolute;
		height: 100%;
		background-color: #f9f9f9;
		z-index: 1;
		text-align: left;
		font-family: var(--font);
	}
	ul {
		padding: 100px 100px;
	}
	#close {
		text-align: right;
		margin: 20px 100px;
		float: right;
	}
	#exit {
		text-align: right;
		margin: 20px 100px;
		float: left;
	}
	h2 {
		font-size: 2rem;
	}
</style>
