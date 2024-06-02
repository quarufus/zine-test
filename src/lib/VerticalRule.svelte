<script>
  export let full = false;
  let top = full ? "0" : "64px";
</script>

<!--<div id="left"></div>-->
<div style="--top: {top}"></div>

<!--<div id="right"></div>-->

<style>
  /*
  #left {
    width: 47px;
    height: 100%;
    flex-shrink: 0;
    background: linear-gradient(90deg, rgba(217, 217, 217, 0) 0%, #000 100%);
    position: absolute;
    left: 47px;
  }
  */
  div {
    background-color: var(--accent);
    width: 2px;
    top: var(--top);
    position: absolute;
    height: 100%;
    left: calc(50% - 1px);
    position: fixed;
  }
  /*
  #right {
    width: 68px;
    height: 100%;
    flex-shrink: 0;
    background: linear-gradient(
      270deg,
      rgba(217, 217, 217, 0) 0%,
      rgba(255, 255, 255, 0.51) 49.5%,
      #000 100%
    );
  }
  */
</style>
