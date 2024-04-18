<script lang="ts">
	import Pages from '$lib/Pages.svelte';
	import SinglePage from '$lib/SinglePage.svelte';
	import { setIndex } from '$lib/stores';

	setIndex(2);
	let zines = ['One', 'Two', 'Three', 'Four', 'Five'];
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

{#if innerWidth > 900}
	<Pages>
		<div slot="left" class="wrapper">
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
		<h1 slot="right">About</h1>
	</Pages>
{:else}
	<SinglePage>
		<h1 slot="content">About</h1>
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
	button {
		all: unset;
	}
</style>
