<script lang="ts">
	import FontSelect from "./FontSelect.svelte";
	import Slider from "./Slider.svelte";
	import { readerSettings } from "$lib/stores";

	export let toggleSettings;
	export let innerWidth: number;
	export let size: number;
	export let font: string;

	let width: number;
	$: $readerSettings.fontSize = size;
	$: $readerSettings.fontFamily = font;

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
			<FontSelect
				title="Theme"
				bind:selected={$readerSettings.theme}
				selections={["Default", "Dark", "Other"]}
			/>
		</li>
		<li>
			<FontSelect
				title="Font"
				bind:selected={$readerSettings.fontFamily}
				selections={["Inter", "Fira Code", "Literata"]}
			/>
		</li>
		<li>
			<h2>Text size: {size}</h2>
			<Slider min={10} max={30} bind:defaultValue={size} />
		</li>
		<li>
			<h2>Text spacing: {$readerSettings.letterSpacing + 1}</h2>
			<Slider
				min={0}
				max={9}
				bind:defaultValue={$readerSettings.letterSpacing}
			/>
		</li>
	</ul>
</div>

<style>
	div {
		width: calc(var(--width) - 1px);
		position: absolute;
		height: 100%;
		background-color: var(--bg);
		z-index: 11;
		text-align: left;
		font-family: var(--font);
	}
	li {
		height: 20vh;
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
		margin: 100px 15% 0 15%;
	}
	button {
		margin: 20px;
	}
	h2 {
		font-size: 2rem;
	}
</style>
