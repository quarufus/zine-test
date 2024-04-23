<script lang="ts">
	export let index;
	export let toggleMenu;

	const titles = ["Home", "Zines", "About", "Contact"];
</script>

<ul class="fixed w-full bg-white z-10 top-0">
	<li id="title">{titles[index.index]}</li>
	<li id="burger"><button on:click={toggleMenu}>Menu</button></li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-bottom: var(--border);
		margin: 0;
		padding: 0;
	}
	li {
		padding: 20px;
		width: 50%;
		font-weight: 500;
		font-size: 1em;
	}
	#title {
		text-align: left;
	}
	#burger {
		text-align: right;
	}
</style>
