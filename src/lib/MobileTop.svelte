<script lang="ts">
	export let index;
	export let toggleMenu;

	const titles = ['Home', 'Zines', 'About', 'Contact'];
</script>

<ul>
	<li id="title">{titles[index]}</li>
	<li id="burger"><button on:click={toggleMenu}>Menu</button></li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-bottom: 2px solid black;
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
