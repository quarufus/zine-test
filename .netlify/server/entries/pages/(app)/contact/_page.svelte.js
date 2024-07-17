import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { P as Pages } from "../../../../chunks/Pages.js";
import { s as setIndex } from "../../../../chunks/stores2.js";
import { S as SinglePage } from "../../../../chunks/SinglePage.js";
import { C as Contact } from "../../../../chunks/Contact.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  setIndex(3);
  innerWidth = 0;
  return ` ${$$result.head += `<!-- HEAD_svelte-1xgjl42_START --><meta name="description" content="Contact page for To Bitoni, a webzine focused on art"><!-- HEAD_svelte-1xgjl42_END -->`, ""} ${innerWidth > 900 ? `${validate_component(Pages, "Pages").$$render($$result, {}, {}, {
    right: () => {
      return `${validate_component(Contact, "Contact").$$render($$result, { slot: "right" }, {}, {})}`;
    },
    left: () => {
      return `<div slot="left"></div>`;
    }
  })}` : `${validate_component(SinglePage, "SinglePage").$$render($$result, {}, {}, {
    content: () => {
      return `${validate_component(Contact, "Contact").$$render($$result, { slot: "content" }, {}, {})}`;
    }
  })}`}`;
});
export {
  Page as default
};
