<script>
  import "../app.pcss";
</script>

<slot />

<style>
  :root {
    --bg: #f3e7db;
    --accent: black;
    --border: 2px solid var(--accent);
    font-family: Inter;
  }
  :global(body) {
    margin: 0;
    font-family: Inter;
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
