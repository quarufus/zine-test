<script>
  import { createSelect, melt } from "@melt-ui/svelte";
  export let font;

  const fonts = ["Inter", "Courier New", "Times New Roman"];

  const {
    elements: { trigger, menu, option, label },
    states: { selectedLabel, open },
    helpers: { isSelected },
  } = createSelect({
    forceVisible: true,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true,
    },
    defaultSelected: { value: font, label: font },
  });

  $: font = $selectedLabel;
</script>

<div class="flex flex-col gap-1 text-sm">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label class="block text-3xl" use:melt={$label}>Font</label>
  <button
    class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2
  text-magnum-700 shadow transition-opacity hover:opacity-90"
    use:melt={$trigger}
    aria-label="Food"
  >
    {$selectedLabel || "Inter"}
  </button>
  {#if $open}
    <div
      class="z-12 flex max-h-[300px] flex-col
    overflow-y-auto rounded-lg bg-white p-1
    shadow focus:!ring-0"
      use:melt={$menu}
    >
      {#each fonts as item}
        <div
          class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4 text-neutral-800
              hover:bg-magnum-100 focus:z-12
              focus:text-magnum-700
              data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900
              data-[disabled]:opacity-50"
          use:melt={$option({ value: item, label: item })}
        >
          <div class="check {$isSelected(item) ? 'block' : 'hidden'}">~</div>

          {item}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .check {
    position: absolute;
    left: theme(spacing.2);
    top: 50%;
    z-index: 14;
    translate: 0 calc(-50% + 1px);
  }
  button {
    border: none;
  }
  div {
    z-index: 12;
  }
</style>
