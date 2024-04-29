<script lang="ts">
  import { createSlider, melt } from "@melt-ui/svelte";
  export let defaultValue: number;
  export let min: number;
  export let max: number;

  const {
    elements: { root, range, thumbs },
    states: { value },
  } = createSlider({
    defaultValue: [defaultValue],
    min: min,
    max: max,
  });

  $: defaultValue = $value[0];
</script>

<span use:melt={$root} class="relative flex h-[20px] w-full items-center">
  <span class="h-[3px] w-full bg-black">
    <span use:melt={$range} class="h-[3px] bg-black" />
  </span>
  <span
    use:melt={$thumbs[0]}
    aria-label="Text size"
    class="h-5 w-5 rounded-full bg-black cursor-pointer"
  />
</span>
