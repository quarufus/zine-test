<script lang="ts">
	export let toggleMenu;
	export let innerWidth: number;

	let width: number;

	$: if (innerWidth > 900) {
		width = 50;
	} else {
		width = 100;
	}
</script>

<div style="--width: {width}%">
	<button id="close" on:click={toggleMenu}>Close</button>
	<ul>
		<li><a href="/home" on:click={toggleMenu}>Home</a></li>
		<li><a href="/zines" on:click={toggleMenu}>Zines</a></li>
		<li><a href="/about" on:click={toggleMenu}>About</a></li>
		<li><a href="/contact" on:click={toggleMenu}>Contact</a></li>
	</ul>
</div>

<style>
	div {
		width: calc(var(--width) - 1px);
		position: absolute;
		height: 100%;
		background-color: var(--bg);
		z-index: 1;
		text-align: left;
	}
	ul {
		list-style: none;
		font-size: 11vmin;
	}
	#close {
		text-align: right;
		margin: 21px 19px;
		float: right;
	}
</style>
