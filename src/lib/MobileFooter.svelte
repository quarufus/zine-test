<script lang="ts">
	export let index: number;

	const title = ["Home", "Zines", "About", "Contact"];
</script>

<ul>
	<li class="left">
		{#if index > 0}
			<a href="/{title[index - 1].toLowerCase()}">&lt- {title[index - 1]}</a>
		{/if}
	</li>
	<li class="right">
		{#if index < title.length - 1}
			<a href="/{title[index + 1].toLowerCase()}">{title[index + 1]} -></a>
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
		height: 64px;
		background-color: var(--bg);
		z-index: 1;
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
