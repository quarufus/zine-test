import { c as create_ssr_component, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import { I as IssueaNav } from "../../../../../chunks/IssueaNav.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-mihg7z_START -->${$$result.title = `<title>To Bitoni | ${escape(data.slug)}</title>`, ""}<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Courier Prime"><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Abhaya Libre"><!-- HEAD_svelte-mihg7z_END -->`, ""} ${validate_component(IssueaNav, "IssueaNav").$$render($$result, { title: data.slug }, {}, {})} ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
