<script lang="ts">
  import { createSelect, melt } from "@melt-ui/svelte";
  export let value: string = "Greek";

  const options = ["English", "Greek"];

  const {
    elements: { trigger, menu, option },
    states: { selectedLabel, open },
    helpers: { isSelected },
  } = createSelect<string>({
    forceVisible: true,
    positioning: {
      placement: "bottom",
      fitViewport: true,
      sameWidth: true,
    },
    defaultSelected: { value: value, label: value },
  });

  $: value = $selectedLabel;
</script>

<div class="flex flex-col gap-1 z-50 absolute top-[50%] left-2">
  <button
    class="flex h-10 w-[110px] items-center justify-between"
    use:melt={$trigger}
    >{$selectedLabel || "selected lang"}
  </button>
  {#if $open}
    <div
      class="z-50 flex max-h-[300px] flex-col
       overflow-y-auto"
      use:melt={$menu}
    >
      {#each options as item}
        <div
          class="relative cursor-pointer p-1 hover:font-bold {$isSelected(item)
            ? 'bg-gray-200'
            : 'bg-white'}"
          use:melt={$option({ value: item, label: item })}
        >
          <div
            class="check absolute right-2 {$isSelected(item)
              ? 'block'
              : 'hidden'}"
          >
            o
          </div>
          {item}
        </div>
      {/each}
    </div>
  {/if}
</div>
