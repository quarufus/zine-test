import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { P as Pages } from "../../../../chunks/Pages.js";
import { C as Contact } from "../../../../chunks/Contact.js";
import { s as setIndex } from "../../../../chunks/stores2.js";
import { S as SinglePage } from "../../../../chunks/SinglePage.js";
const BackCover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return ``;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  setIndex(4);
  innerWidth = 0;
  return ` ${innerWidth > 900 ? `${validate_component(Pages, "Pages").$$render($$result, {}, {}, {
    left: () => {
      return `${validate_component(Contact, "Contact").$$render($$result, { slot: "left" }, {}, {})}`;
    }
  })}` : `${validate_component(SinglePage, "SinglePage").$$render($$result, {}, {}, {
    content: () => {
      return `${validate_component(BackCover, "BackCover").$$render($$result, { slot: "content" }, {}, {})}`;
    }
  })}`}`;
});
export {
  Page as default
};
