<script>
</script>

<div class="wrapper">
  <div class="left"><slot name="left" /></div>
  <div class="right"><slot name="right" /></div>
</div>

<style>
  .wrapper {
    width: 100%;
    position: relative;
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
