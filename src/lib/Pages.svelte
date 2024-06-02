<script>
</script>

<div class="wrapper">
  <div class="left"><slot name="left" /></div>
  <div class="right"><slot name="right" /></div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100vh;
    position: relative;
  }
  .left,
  .right {
    margin-top: 64px;
    height: calc(100vh - 64px);
  }
  .left {
    position: absolute;
    left: 0;
    width: 50%;
  }
  .right {
    position: absolute;
    right: 0;
    top: 0;
    width: 50%;
  }
</style>
