import { c as create_ssr_component, l as compute_rest_props, f as spread, h as escape_object, n as escape_attribute_value, d as each, v as validate_component, e as escape } from "./ssr.js";
const void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
/**
 * @license lucide-svelte v0.379.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const defaultAttributes$1 = defaultAttributes;
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["name", "color", "size", "strokeWidth", "absoluteStrokeWidth", "iconNode"]);
  let { name = void 0 } = $$props;
  let { color = "currentColor" } = $$props;
  let { size = 24 } = $$props;
  let { strokeWidth = 2 } = $$props;
  let { absoluteStrokeWidth = false } = $$props;
  let { iconNode } = $$props;
  const mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && array.indexOf(className) === index;
  }).join(" ");
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.absoluteStrokeWidth === void 0 && $$bindings.absoluteStrokeWidth && absoluteStrokeWidth !== void 0)
    $$bindings.absoluteStrokeWidth(absoluteStrokeWidth);
  if ($$props.iconNode === void 0 && $$bindings.iconNode && iconNode !== void 0)
    $$bindings.iconNode(iconNode);
  return `<svg${spread(
    [
      escape_object(defaultAttributes$1),
      escape_object($$restProps),
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      { stroke: escape_attribute_value(color) },
      {
        "stroke-width": escape_attribute_value(absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth)
      },
      {
        class: escape_attribute_value(mergeClasses("lucide-icon", "lucide", name ? `lucide-${name}` : "", $$props.class))
      }
    ],
    {}
  )}>${each(iconNode, ([tag, attrs]) => {
    return `${((tag$1) => {
      return tag$1 ? `<${tag}${spread([escape_object(attrs)], {})}>${is_void(tag$1) ? "" : ``}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
    })(tag)}`;
  })}${slots.default ? slots.default({}) : ``}</svg>`;
});
const Icon$1 = Icon;
const Door_closed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"
      }
    ],
    ["path", { "d": "M2 20h20" }],
    ["path", { "d": "M14 12v.01" }]
  ];
  return `${validate_component(Icon$1, "Icon").$$render($$result, Object.assign({}, { name: "door-closed" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const DoorClosed = Door_closed;
const css = {
  code: "ul.svelte-e7td1q.svelte-e7td1q{list-style:none;display:flex;margin:0;padding-bottom:4px;position:fixed;width:100%;z-index:10;height:64px}button.svelte-e7td1q.svelte-e7td1q{border:none;padding-bottom:5px}button.svelte-e7td1q.svelte-e7td1q:hover{border-bottom:5px solid black;padding-bottom:0px}.cent.svelte-e7td1q.svelte-e7td1q{padding:20px 50px 0 50px}.left.svelte-e7td1q.svelte-e7td1q{text-align:left}.right.svelte-e7td1q.svelte-e7td1q{text-align:right;align-items:right}#one.svelte-e7td1q.svelte-e7td1q{padding:20px 0 0 0;width:15%;margin-left:10%}#last.svelte-e7td1q.svelte-e7td1q{padding:20px 0 0 20px}#sett.svelte-e7td1q>button.svelte-e7td1q{float:right;margin-left:50px}#exit.svelte-e7td1q.svelte-e7td1q{padding:20px 2% 0 2%}#one.svelte-e7td1q.svelte-e7td1q,#sett.svelte-e7td1q.svelte-e7td1q,#title.svelte-e7td1q.svelte-e7td1q,#last.svelte-e7td1q.svelte-e7td1q{border-bottom:2px solid black;padding-bottom:5px}",
  map: '{"version":3,"file":"IssueaNav.svelte","sources":["IssueaNav.svelte"],"sourcesContent":["<script>\\n\\timport { DoorClosed } from \\"lucide-svelte\\";\\n\\timport { DoorOpen } from \\"lucide-svelte\\";\\n\\timport { onMount } from \\"svelte\\";\\n\\texport let title;\\n\\texport let toggleSettings;\\n\\texport let next;\\n\\texport let previous;\\n\\texport let index;\\n\\texport let length;\\n\\n\\t$: innerWidth = 0;\\n\\t$: myLength = length;\\n\\t$: if (innerWidth > 900 && length % 2 == 0) {\\n\\t\\tmyLength = length - 1;\\n\\t}\\n\\tlet hover = false;\\n\\n\\tonMount(() => {\\n\\t\\tconst icon = document.getElementById(\\"icon\\");\\n\\t\\ticon?.addEventListener(\\"mouseover\\", () => {\\n\\t\\t\\thover = true;\\n\\t\\t});\\n\\t\\ticon?.addEventListener(\\"mouseout\\", () => {\\n\\t\\t\\thover = false;\\n\\t\\t});\\n\\t});\\n<\/script>\\n\\n<svelte:window bind:innerWidth />\\n\\n<ul>\\n\\t<li id=\\"one\\" class=\\"w-[25%]\\">\\n\\t\\t{#if index > 0}\\n\\t\\t\\t<button on:click={previous}>&lt- Previous</button>\\n\\t\\t{/if}\\n\\t</li>\\n\\t<li class=\\"right cent w-[25%]\\" id=\\"sett\\">\\n\\t\\t<button on:click={toggleSettings}>Options</button>\\n\\t</li>\\n\\t<li class=\\"left cent w-[25%]\\" id=\\"title\\">Issue {title}</li>\\n\\t<li class=\\"right w-[15%]\\" id=\\"last\\">\\n\\t\\t{#if index < myLength - 1}\\n\\t\\t\\t<button on:click={next}>Next -></button>\\n\\t\\t{/if}\\n\\t</li>\\n\\t<li class=\\"right w-[10%]\\" id=\\"exit\\">\\n\\t\\t<button\\n\\t\\t\\tid=\\"icon\\"\\n\\t\\t\\ttitle=\\"Close\\"\\n\\t\\t\\tclass=\\"p-0\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tlocation.href = \\"/zines\\";\\n\\t\\t\\t}}\\n\\t\\t>\\n\\t\\t\\t{#if hover}\\n\\t\\t\\t\\t<DoorOpen />\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\t<DoorClosed />\\n\\t\\t\\t{/if}\\n\\t\\t</button>\\n\\t</li>\\n</ul>\\n\\n<style>\\n\\tul {\\n\\t\\tlist-style: none;\\n\\t\\tdisplay: flex;\\n\\t\\tmargin: 0;\\n\\t\\tpadding-bottom: 4px;\\n\\t\\tposition: fixed;\\n\\t\\twidth: 100%;\\n\\t\\tz-index: 10;\\n\\t\\t/*border-bottom: 5px solid var(--accent);*/\\n\\t\\theight: 64px;\\n\\t}\\n\\tbutton {\\n\\t\\tborder: none;\\n\\t\\tpadding-bottom: 5px;\\n\\t}\\n\\tbutton:hover {\\n\\t\\tborder-bottom: 5px solid black;\\n\\t\\tpadding-bottom: 0px;\\n\\t}\\n\\t.cent {\\n\\t\\tpadding: 20px 50px 0 50px;\\n\\t}\\n\\t.left {\\n\\t\\ttext-align: left;\\n\\t}\\n\\t.right {\\n\\t\\ttext-align: right;\\n\\t\\talign-items: right;\\n\\t}\\n\\t/*\\n\\tli {\\n\\t\\tfloat: left;\\n\\t\\tfont-weight: 500;\\n\\t}\\n\\t*/\\n\\t#one {\\n\\t\\tpadding: 20px 0 0 0;\\n\\t\\twidth: 15%;\\n\\t\\tmargin-left: 10%;\\n\\t}\\n\\t#last {\\n\\t\\tpadding: 20px 0 0 20px;\\n\\t}\\n\\t#sett > button {\\n\\t\\tfloat: right;\\n\\t\\tmargin-left: 50px;\\n\\t}\\n\\t#exit {\\n\\t\\tpadding: 20px 2% 0 2%;\\n\\t}\\n\\t#one,\\n\\t#sett,\\n\\t#title,\\n\\t#last {\\n\\t\\tborder-bottom: 2px solid black;\\n\\t\\tpadding-bottom: 5px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAiEC,8BAAG,CACF,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CACT,cAAc,CAAE,GAAG,CACnB,QAAQ,CAAE,KAAK,CACf,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,EAAE,CAEX,MAAM,CAAE,IACT,CACA,kCAAO,CACN,MAAM,CAAE,IAAI,CACZ,cAAc,CAAE,GACjB,CACA,kCAAM,MAAO,CACZ,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,cAAc,CAAE,GACjB,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,IACtB,CACA,iCAAM,CACL,UAAU,CAAE,IACb,CACA,kCAAO,CACN,UAAU,CAAE,KAAK,CACjB,WAAW,CAAE,KACd,CAOA,gCAAK,CACJ,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,GACd,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IACnB,CACA,mBAAK,CAAG,oBAAO,CACd,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IACd,CACA,iCAAM,CACL,OAAO,CAAE,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,EACpB,CACA,gCAAI,CACJ,iCAAK,CACL,kCAAM,CACN,iCAAM,CACL,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CAC9B,cAAc,CAAE,GACjB"}'
};
const IssueaNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  let myLength;
  let { title } = $$props;
  let { toggleSettings } = $$props;
  let { next } = $$props;
  let { previous } = $$props;
  let { index } = $$props;
  let { length } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.toggleSettings === void 0 && $$bindings.toggleSettings && toggleSettings !== void 0)
    $$bindings.toggleSettings(toggleSettings);
  if ($$props.next === void 0 && $$bindings.next && next !== void 0)
    $$bindings.next(next);
  if ($$props.previous === void 0 && $$bindings.previous && previous !== void 0)
    $$bindings.previous(previous);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  if ($$props.length === void 0 && $$bindings.length && length !== void 0)
    $$bindings.length(length);
  $$result.css.add(css);
  innerWidth = 0;
  myLength = length;
  {
    if (innerWidth > 900 && length % 2 == 0) {
      myLength = length - 1;
    }
  }
  return ` <ul class="svelte-e7td1q"><li id="one" class="w-[25%] svelte-e7td1q">${index > 0 ? `<button class="svelte-e7td1q" data-svelte-h="svelte-14x8q6j">&lt;- Previous</button>` : ``}</li> <li class="right cent w-[25%] svelte-e7td1q" id="sett"><button class="svelte-e7td1q" data-svelte-h="svelte-4kkcdz">Options</button></li> <li class="left cent w-[25%] svelte-e7td1q" id="title">Issue ${escape(title)}</li> <li class="right w-[15%] svelte-e7td1q" id="last">${index < myLength - 1 ? `<button class="svelte-e7td1q" data-svelte-h="svelte-1ihs7v5">Next -&gt;</button>` : ``}</li> <li class="right w-[10%] svelte-e7td1q" id="exit"><button id="icon" title="Close" class="p-0 svelte-e7td1q">${`${validate_component(DoorClosed, "DoorClosed").$$render($$result, {}, {}, {})}`}</button></li> </ul>`;
});
export {
  IssueaNav as I,
  Icon$1 as a
};
