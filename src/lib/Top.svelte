<script lang="ts">
	export let index: number;
	export let toggleMenu = () => {};

	const title = ["Start", "Home", "Zines", "About", "Contact", "End"];
</script>

<ul>
	<li class="left">
		{#if index > 0}
			{#if title[index - 1] == "Start"}
				<a href="/home">&lt- {title[index - 1]}</a>
			{:else}
				<a href="/{title[index].toLowerCase()}">&lt- {title[index - 1]}</a>
			{/if}
		{/if}
	</li>
	<li class="right"><button on:click={toggleMenu}>Menu</button></li>
	<li class="left">Bitoni</li>
	<li class="right">
		{#if index < 4}
			<a href="/{title[index + 2].toLowerCase()}">{title[index + 2]} -></a>
		{/if}
	</li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-bottom: var(--border);
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
