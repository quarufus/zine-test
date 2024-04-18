<script>
	export let title;
	export let toggleSettings;
</script>

<ul>
	<li>&lt- Previous</li>
	<li class="right"><button on:click={toggleSettings}>Settings</button></li>
	<li class="left">Issue {title}</li>
	<li class="right">Next -></li>
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
