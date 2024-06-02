<script>
  import "../app.pcss";
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@100..900&family=Ysabeau+Office:ital,wght@0,1..1000;1,1..1000&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<slot />

<style>
  :root {
    --bg: #fff; /*#f3e7db;*/
    --accent: black;
    --border: 2px solid var(--accent);
    font-family: Inter;
  }
  :global(body) {
    margin: 0;
    /*font-family: Inter;*/
  }
  :global(p) {
    font-weight: 300;
    font-size: 1.3em;
  }
  :global(h1) {
    font-family: Durer;
    font-size: 2.5em;
    font-weight: 100;
    line-height: 1.1;
  }
  :global(button) {
    all: unset;
    cursor: pointer;
    border-bottom: 5px solid var(--accent);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  :global(a) {
    all: unset;
    cursor: pointer;
    border-bottom: 5px solid var(--accent);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  @font-face {
    font-family: Durer;
    src: url("$lib/fonts/IFDurerDisplay.woff");
  }
  @font-face {
    font-family: Inter;
    src: url("$lib/fonts/Inter-Medium.woff");
  }
</style>
