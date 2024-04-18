<script>
	import '../app.pcss';
</script>

<slot></slot>

<style>
	:root {
		background-color: var(--bg);
		font-family: Inter;
	}
	:global(body) {
		margin: 0;
		font-family: Inter;
		background-color: #f9f9f9;
	}
	:global(h1) {
		font-family: Durer;
		font-size: 4em;
		font-weight: 100;
	}
	:global(button) {
		all: unset;
		cursor: pointer;
		border-bottom: 5px solid black;
	}
	:global(a) {
		all: unset;
		cursor: pointer;
		border-bottom: 5px solid black;
	}
	@font-face {
		font-family: Durer;
		src: url('$lib/fonts/IFDurerDisplay.woff');
	}
	@font-face {
		font-family: Inter;
		src: url('$lib/fonts/Inter-Medium.woff');
	}
</style>
