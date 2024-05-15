<script lang="ts">
	import { createSlider, melt } from "@melt-ui/svelte";
	import { createEventDispatcher } from "svelte";
	import FontSelect from "./FontSelect.svelte";
	import Slider from "./Slider.svelte";
	import { setFontSize, readerSettings, setReaderSettings } from "$lib/stores";

	const dispach = createEventDispatcher();

	export let toggleSettings;
	export let innerWidth: number;
	export let size: number;
	export let font: string;

	let width: number;
	//$: textSize = 10;
	//let settings = $readerSettings;
	//$: setReaderSettings(settings);
	//let fontSize = [settings.fontSize];
	//$: setFontSize(fontSize[0]);
	$: $readerSettings.fontSize = size;
	$: $readerSettings.fontFamily = font;

	//$: {
	//	dispach("fontChange", { textSize });
	//	size = textSize;
	//}

	$: if (innerWidth > 900) {
		width = 50;
	} else {
		width = 100;
	}
</script>

<div style="--width: {width}%; --font: {font};" class="h-dvh">
	<button
		id="exit"
		on:click={() => {
			location.href = "/zines";
		}}>Exit</button
	>
	<button id="close" on:click={toggleSettings}>Close</button>
	<ul class="text-[11vmin]">
		<li>
			<h2>Theme</h2>
		</li>
		<li>
			<FontSelect bind:font />
		</li>
		<br />
		<li><h2>Text size: {size}</h2></li>
		<li>
			<Slider min={10} max={30} bind:defaultValue={size}></Slider>
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
		z-index: 11;
		text-align: left;
		font-family: var(--font);
	}
	#close {
		text-align: right;
		float: right;
	}
	#exit {
		text-align: right;
		float: left;
	}
	ul {
		margin: 100px 25px;
	}
	button {
		margin: 20px;
	}
	h2 {
		font-size: 2rem;
	}
</style>
