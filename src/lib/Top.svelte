<script lang="ts">
	export let index;
	export let toggleMenu;

	const title = ['Start', 'Home', 'Zines', 'About', 'Contact', 'End'];
</script>

<ul>
	<li class="left">
		{#if index.index > 0}
			{#if title[index.index - 1] == 'Start'}
				<a href="/home">&lt- {title[index.index - 1]}</a>
			{:else}
				<a href="/{title[index.index].toLowerCase()}">&lt- {title[index.index - 1]}</a>
			{/if}
		{/if}
	</li>
	<li class="right"><button on:click={toggleMenu}>Menu</button></li>
	<li class="left">{title[index.index + 1]}</li>
	<li class="right">
		{#if index.index < 4}
			<a href="/{title[index.index + 2].toLowerCase()}">{title[index.index + 2]} -></a>
		{/if}
	</li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-bottom: 2px solid black;
		margin: 0;
		padding: 0;
	}
	.left {
		text-align: left;
	}
	.right {
		text-align: right;
		align-items: right;
	}
	li {
		padding: 20px;
		float: left;
		width: 25%;
		font-weight: 500;
	}
</style>
