<script>
	export let index;

	const title = ["Home", "Zines", "About", "Contact"];
</script>

<ul>
	<li class="left">
		{#if index.index > 0}
			<a href="/{title[index.index - 1].toLowerCase()}"
				>&lt- {title[index.index - 1]}</a
			>
		{/if}
	</li>
	<li class="right">
		{#if index.index < 3}
			<a href="/{title[index.index + 1].toLowerCase()}"
				>{title[index.index + 1]} -></a
			>
		{/if}
	</li>
</ul>

<style>
	ul {
		list-style: none;
		display: flex;
		border-top: var(--border);
		margin: 0;
		padding: 0;
		bottom: 0;
		position: fixed;
		width: 100%;
		background-color: var(--bg);
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
		width: 50%;
		font-weight: 500;
	}
</style>
