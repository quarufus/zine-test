<script lang="ts">
	import { createSlider, melt } from "@melt-ui/svelte";
	import { createEventDispatcher } from "svelte";

	const dispach = createEventDispatcher();

	export let toggleSettings;
	export let innerWidth: number;
	export let size;

	let width: number;
	$: textSize = $value;
	size = textSize;

	$: {
		dispach("fontChange", { textSize });
		size = textSize;
		//console.log(textSize);
	}

	$: if (innerWidth > 900) {
		width = 50;
	} else {
		width = 100;
	}

	const {
		elements: { root, range, thumbs, ticks },
		states: { value },
	} = createSlider({
		defaultValue: [30],
		min: 10,
		step: 10,
		max: 70,
	});
</script>

<div style="--width: {width}%" class="h-dvh">
	<button
		id="exit"
		on:click={() => {
			location.href = "/zines";
		}}>Exit</button
	>
	<button id="close" on:click={toggleSettings}>Close</button>
	<ul class="h-dvh py-25 py-100 px-10 text-[11vmin]">
		<li><h2>Font</h2></li>
		<li><h2>Text size: {textSize}</h2></li>
		<li>
			<span use:melt={$root} class="relative flex h-[20px] w-full items-center">
				<span class="h-[3px] w-full bg-black">
					<span use:melt={$range} class="h-[3px] bg-black" />
				</span>

				{#each $ticks as tick}
					<span
						use:melt={tick}
						class="h-[3px] w-[3px] rounded-full bg-white data-[bounded]:bg-white"
					/>
				{/each}

				<span
					use:melt={$thumbs[0]}
					aria-label="Text size"
					class="h-5 w-5 rounded-full bg-black cursor-pointer"
				/>
			</span>
		</li>
		<li><h2>Text spacing</h2></li>
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
	}
	ul {
		padding: 100px 40px;
	}
	#close {
		text-align: right;
		margin: 20px 19px;
		float: right;
	}
	#exit {
		text-align: right;
		margin: 20px 19px;
		float: left;
	}
	h2 {
		font-size: 2rem;
	}
	/* 	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		background: #000;
		height: 5px;
		position: relative;
		top: -70px;
	}
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none; 
		appearance: none;
		width: 25px;
		height: 25px; 
		background: #000;
		cursor: pointer;
		border: none;
		border-radius: 50%;
	}
	.slider::-moz-range-thumb {
		width: 25px;
		height: 25px;
		background: #000; 
		cursor: pointer; 
		border: none;
		border-radius: 50%;
	} */
</style>
