<script lang="ts">
	import FontSelect from "./FontSelect.svelte";
	import Slider from "./Slider.svelte";
	import { readerSettings } from "$lib/stores";
	import ScrollArea from "$lib/ScrollArea.svelte";

	export let innerWidth: number;

	let width: number;

	console.log($readerSettings);

	$: if (innerWidth > 900) {
		width = 50;
	} else {
		width = 100;
	}
</script>

<div
	style="--width: {width}%; --font: {$readerSettings.fontFamily}; --size: calc({$readerSettings.fontSize}px * 0.7)"
	class=""
>
	<ScrollArea>
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
				<h2>Text size: {$readerSettings.fontSize}</h2>
				<Slider
					min={10}
					max={30}
					bind:defaultValue={$readerSettings.fontSize}
				/>
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
	</ScrollArea>
</div>

<style>
	div {
		width: calc(var(--width) - 1px);
		position: absolute;
		top: 64px;
		height: calc(100% - 64px);
		background-color: var(--bg);
		z-index: 11;
		text-align: left;
		font-family: var(--font);
	}
	li {
		height: 26vh;
	}
	ul {
		margin: 26px 50px 0 20%;
	}
	ul > li {
		font-size: 0.875rem;
	}
	h2 {
		font-size: 2em;
	}
	@media only screen and (max-width: 900px) {
		div {
			width: var(--width);
		}
		ul {
			margin: 100px 10%;
		}
		ul > li {
			font-size: var(--size);
		}
	}
</style>
