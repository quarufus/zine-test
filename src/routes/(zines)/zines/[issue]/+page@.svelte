<script>
	import IssueaNav from "$lib/IssueaNav.svelte";
	import Settings from "$lib/Settings.svelte";
	import VerticalRule from "$lib/VerticalRule.svelte";
	import { onMount } from "svelte";
	import One from "$lib/zines/One.html?raw";

	let settings = false;
	$: innerWidth = 0;
	let index = 0;
	$: length = 0;
	let root;
	$: textSize = [30];
	let mounted = false;
	let adder = 2;
	$: width = innerWidth / 2;

	$: if (innerWidth > 900) {
		width = innerWidth / 2;
		adder = 2;
	} else {
		width = innerWidth;
		adder = 1;
	}

	$: if (mounted) {
		//dummy = textSize;
		appendChunks(visibleChunks(getNodes(content)));
		console.log(textSize);
	}

	function toggleSettings() {
		settings = !settings;
	}

	function next() {
		index += adder;
		appendChunks(visibleChunks(getNodes(content)));
		console.log(length);
		console.log(index);
	}
	function previous() {
		if (index > 0) {
			index -= adder;
			appendChunks(visibleChunks(getNodes(content)));
		}
	}

	export let data;

	//let parser = new DOMParser();
	//let content = parser.parseFromString(content, "text/html");
	//let content = fetch("$lib/zines/One.html");
	let content = One;
	console.log(content);

	function getNodes(htmlDocument) {
		const offscreenDiv = document.createElement("div");
		offscreenDiv.className = "page";
		offscreenDiv.style.position = "absolute";
		offscreenDiv.style.top = "-3000px";
		offscreenDiv.innerHTML = htmlDocument;
		//offscreenDiv.style.display = "flex";
		//offscreenDiv.style.flexWrap = "wrap";
		offscreenDiv.style.margin = "0 100px";
		offscreenDiv.style.padding = "30px 0";
		offscreenDiv.style.borderTop = "1px solid black";
		offscreenDiv.style.height = "700px";
		//offscreenDiv.style.fontSize = (textSize / 1000).toString() + "em";
		offscreenDiv.style.fontSize =
			((innerWidth / 30000) * textSize).toString() + "em";
		offscreenDiv.style.width = (width - 60).toString() + "px";
		document.body.appendChild(offscreenDiv);
		let offscreenRect = offscreenDiv.getBoundingClientRect();
		//console.log("offscreenRect:", offscreenRect);
		const chunks = [];
		let currentChunk = [];
		for (let i = 0; i < offscreenDiv.children.length; i++) {
			const current = offscreenDiv.children[i];
			const currentRect = current.getBoundingClientRect();
			currentChunk.push(current);
			if (currentRect.bottom > offscreenRect.bottom) {
				// current element is overflowing offscreenDiv, remove it from current chunk
				currentChunk.pop();
				// remove all elements in currentChunk from offscreenDiv
				currentChunk.forEach((elem) => elem.remove());
				// since children were removed from offscreenDiv, adjust i to start back at current eleme on next iteration
				i -= currentChunk.length;
				// push current completed chunk to the resulting chunklist
				chunks.push(currentChunk);
				// initialise new current chunk
				currentChunk = [current];
				offscreenRect = offscreenDiv.getBoundingClientRect();
			}
		}
		// currentChunk may not be empty but we need the last elements
		if (currentChunk.length > 0) {
			currentChunk.forEach((elem) => elem.remove());
			chunks.push(currentChunk);
		}
		// offscreenDiv is not needed anymore
		offscreenDiv.remove();
		return chunks;
	}
	export function appendChunks(chunks) {
		const container = document.getElementsByClassName("root_container")[0];
		container.innerHTML = "";
		chunks.forEach((chunk, index) => {
			// ex of a page header
			const header = document.createElement("div");
			header.innerHTML =
				'<h4 style="margin: 5px">Page ' + (index + 1) + "</h4>";
			//container.appendChild(header);
			const page = document.createElement("div");
			page.className = "page";
			//page.style.display = "flex";
			//page.style.flexWrap = "wrap";
			page.style.margin = "0 100px";
			page.style.padding = "30px 0";
			page.style.borderTop = "1px solid black";
			page.style.width = (width - 60).toString() + "px";
			page.style.fontSize = ((innerWidth / 30000) * textSize).toString() + "em";
			chunk.forEach((elem) => page.appendChild(elem));
			container.appendChild(page);
		});
	}

	function visibleChunks(chunks) {
		const visible = [];
		length = chunks.length;
		visible.push(chunks[index]);
		if (innerWidth > 900) {
			visible.push(chunks[index + 1]);
		}
		return visible;
	}

	onMount(() => {
		//content = fetch("/zines/One.html");
		mounted = true;

		if (innerWidth < 900) {
			adder = 1;
		}

		appendChunks(visibleChunks(getNodes(content)));

		const resizeObserver = new ResizeObserver(() => {
			appendChunks(visibleChunks(getNodes(content)));
		});

		resizeObserver.observe(root);

		return () => resizeObserver.unobserve(root);
	});
</script>

<svelte:window bind:innerWidth />

{#if settings}
	<Settings {toggleSettings} {innerWidth} bind:size={textSize} />
{/if}
<IssueaNav
	title={data.slug}
	{toggleSettings}
	{next}
	{previous}
	{index}
	bind:length
/>
{#if innerWidth > 900}
	<VerticalRule />
{/if}
<div class="root_container" bind:this={root}></div>

<!--
<Pages>
	<h1 slot="left">O</h1>
	<div slot="right" class="p-10">
		<h1>{data.slug}</h1>
		<p>{zines.One.content}</p>
	</div>
</Pages>
-->

<style>
	:root {
		background-color: var(--bg);
	}
	:global(body) {
		margin: 0;
	}
	.root_container {
		display: flex;
		height: calc(100dvh - 70px);
		width: 100%;
		top: 70px;
		position: relative;
		overflow-x: hidden;
	}
	p {
		height: 100dvh;
		font-size: 50px;
	}
	.page {
		float: left;
		border: 1px solid;
		width: 50%;
		height: auto;
		margin-bottom: 20px;
	}
</style>
