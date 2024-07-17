import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { P as Pages } from "../../../../chunks/Pages.js";
import { S as SinglePage } from "../../../../chunks/SinglePage.js";
import { s as setIndex } from "../../../../chunks/stores2.js";
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="p-10" data-svelte-h="svelte-1jlruvd"><h1 class="my-5">To Bitoni</h1> <p>είναι ένα κανάλι δημοσίευσης συλλογικών χαλιτεχνημάτων / δημιουργιών Σε κάθε
    τεύχος του Bitoni/bitonίou/μπιτονιέρα-νιέρα θα βρεις ορισμένα δημιουργικά
    ξεβράσματα σε μοναδικές, αυτοτελείς θεματικές που αν μη τι άλλο θα σε
    συναρπάσουν, θα σε πάρουν και θα σε σηκώσουν. Δημιουργήθηκε από μια παρέα
    φίλων που επιθυμούσαν να μοιραστούν τα γυαλιά όρασης τους με τον υπόλοιπο
    κόσμο. Σου τα προσφερουμε να τα φορέσεις / σου τα φοράμε, πρόσφερε τα.
    <br> <br>
    Φιλικά, η ομάδα To Bitoni</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerWidth;
  setIndex(0);
  innerWidth = 0;
  return ` ${$$result.head += `<!-- HEAD_svelte-at2s91_START --><meta name="description" content="Home page for To Bitoni, a webzine focused on art"><!-- HEAD_svelte-at2s91_END -->`, ""} ${innerWidth > 900 ? `${validate_component(Pages, "Pages").$$render($$result, {}, {}, {
    right: () => {
      return `${validate_component(Home, "Home").$$render($$result, { slot: "right" }, {}, {})}`;
    },
    left: () => {
      return `<div slot="left"></div>`;
    }
  })}` : `${validate_component(SinglePage, "SinglePage").$$render($$result, {}, {}, {
    content: () => {
      return `${validate_component(Home, "Home").$$render($$result, { slot: "content" }, {}, {})}`;
    }
  })}`}`;
});
export {
  Page as default
};
