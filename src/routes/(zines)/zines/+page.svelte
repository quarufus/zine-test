<script>
	import Pages from '$lib/Pages.svelte';
	import SinglePage from '$lib/SinglePage.svelte';
	import { setIndex } from '$lib/stores';

	setIndex(1);
	let zines = ['One', 'Two', 'Three', 'Four', 'Five'];
	$: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<h1 slot="left">Home</h1>
		<div slot="right" class="wrapper">
			<h1>Zines</h1>
			<div class="container">
				{#each zines as zine}
					<button
						class="item"
						on:click={() => {
							location.href = '/zines/' + zine;
						}}
					>
						{zine}
					</button>
				{/each}
			</div>
		</div>
	</Pages>
{:else}
	<SinglePage>
		<div slot="content">
			<h1>Zines</h1>
			<div class="container">
				{#each zines as zine}
					<button
						class="item"
						on:click={() => {
							location.href = '/zines/' + zine;
						}}
					>
						{zine}
					</button>
				{/each}
			</div>
		</div>
	</SinglePage>
{/if}

<style>
	h1 {
		margin: 50px 10px;
	}
	.wrapper {
		margin: 10px;
	}
	.container {
		display: flex;
		flex-flow: row wrap;
		justify-content: start;
	}
	.item,
	button {
		margin: 10px;
		padding: 20px;
		width: calc(33.3% - 64px);
		height: 17rem;
		border: 2px solid black;
		cursor: pointer;
	}
	@media only screen and (max-width: 600px), (min-width: 900px) and (max-width: 1200px) {
		.item,
		button {
			width: calc(50% - 64px);
		}
	}
	@media only screen and (max-width: 350px) {
		.item,
		button {
			width: calc(100% - 64px);
		}
	}
	button {
		all: unset;
	}
</style>
