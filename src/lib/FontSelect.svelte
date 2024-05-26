<script lang="ts">
  import { createSelect, melt } from "@melt-ui/svelte";
  import Dot from "lucide-svelte/icons/dot";
  export let selections: string[] = [];
  export let selected: string;
  export let title: string;

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
    defaultSelected: { value: selected, label: selected },
  });

  $: selected = $selectedLabel;
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
  <label class="block text-[2em]" use:melt={$label}>{title}</label>
  <button
    class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-black text-white px-3 py-2
  text-magnum-700 shadow transition-opacity hover:opacity-90"
    use:melt={$trigger}
    aria-label="Food"
  >
    {$selectedLabel || "Inter"}
  </button>
  {#if $open}
    <div
      class="z-12 flex max-h-[300px] flex-col
    overflow-y-auto rounded-lg bg-black text-white p-1
    shadow focus:!ring-0"
      use:melt={$menu}
    >
      {#each selections as item}
        <div
          class="relative cursor-pointer rounded-lg py-1 pl-8 pr-4
              hover:bg-magnum-100 focus:z-12
              focus:text-magnum-700
              data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900
              data-[disabled]:opacity-50"
          use:melt={$option({ value: item, label: item })}
        >
          <div class="check {$isSelected(item) ? 'block' : 'hidden'}">
            <Dot />
          </div>

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
