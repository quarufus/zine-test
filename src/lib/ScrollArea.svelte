<script>
  import { createScrollArea, melt } from "@melt-ui/svelte";

  const {
    elements: { root, content, viewport, corner, scrollbarY, thumbY },
  } = createScrollArea({
    type: "scroll",
    dir: "ltr",
  });
</script>

<div
  use:melt={$root}
  id="fuck"
  class="relative h-[calc(100dvh - 71px)] w-full overflow-hidden"
>
  <div use:melt={$viewport} class="h-full w-full">
    <div use:melt={$content}>
      <slot />
    </div>
  </div>
  <div
    use:melt={$scrollbarY}
    class="flex h-full w-2.5 touch-none select-none border-l border-l-transparent bg-neutral-300/10 p-px transition-colors"
  >
    <div use:melt={$thumbY} class="relative flex-1 rounded-full bg-black" />
  </div>
  <div use:melt={$corner} />
</div>

<style>
  #fuck {
    height: calc(100dvh - 71px);
  }
</style>
