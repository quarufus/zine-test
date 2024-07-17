import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { S as SinglePage } from "../../../../chunks/SinglePage.js";
import { s as setIndex } from "../../../../chunks/stores2.js";
import "dequal";
import { c as createScrollArea } from "../../../../chunks/create.js";
/* empty css                                                     */
const About = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="p-10" data-svelte-h="svelte-to4k4z"><h1 class="my-5">Περί ημών</h1> <p>Το Bitoni είναι ένα συλλογικό, ηλεκτρονικό (και όχι μόνο) περιοδικό που
    εκδίδεται εποχιακά. Στην ιστοσελίδα του Bitoni θα βρεις ανεβασμένα τα τεύχη
    του περιοδικού. Το κάθε τεύχος είναι αφιερωμένο σε μια μοναδική /
    διαφορετική θεματική. Το υλικό που θα βρεις μέσα στα τεύχη κυμαίνεται από
    πεζά κείμενα &amp; παραμύθια, μέχρι γραφιστικά και ποιήματα, πατάτες, ντομάτες,
    δροσερά μαρούλια και μουσικές καρέκλες. Οι μανάβηδες της γειτονιάς σου που
    δημιουργούν, συντάσουν και σου προσφέρουν απλόχερα αυτό το περιοδικό είναι
    μια ομάδα φίλων που αποτελείται από:
    <br> <br>
    … Μπορεις να κατεβασεις το περιοδικό δωρεαν. Εάν θες να συνεισφέρεις οικονομικά
    για την πιθανή μελλοντική τύπωση του περιοδικού και το κόστος της ιστοσελίδας,
    δώσε μας κανα ψιλό … Κάνε εγγραφή παρακάτω για περισσότερες ενημερώσεις και ανακοινώσεις.</p></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  setIndex(2);
  createScrollArea({ type: "scroll", dir: "ltr" });
  return ` ${$$result.head += `<!-- HEAD_svelte-qawufb_START --><meta name="description" content="About page for To Bitoni, a webzine focused on art"><!-- HEAD_svelte-qawufb_END -->`, ""} ${`${validate_component(SinglePage, "SinglePage").$$render($$result, {}, {}, {
    content: () => {
      return `${validate_component(About, "About").$$render($$result, { slot: "content" }, {}, {})}`;
    }
  })}`}`;
});
export {
  Page as default
};
