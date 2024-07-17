import { c as create_ssr_component } from "./ssr.js";
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="p-10" data-svelte-h="svelte-bk1nv7"><h1 class="my-5">Επικοινωνία</h1> <p>Το περιοδικό διατίθεται ηλεκτρονικά και μπορείς να το κατεβάσεις δωρεάν....
    Εαν θέλεις μπορείς να <a href="/#">συνεισφέρεις</a> για την μελλοντική
    τύπωση του περιοδικού και το κόστος της ιστοσελίδας και να μας ακολοθήσεις
    στο
    <a href="/#">Φμπ, Ινστα</a>.</p> <br> <br> <p>Για περισσότερες ανακοινώσεις και ενημερώσεις, κάνε <a href="http://eepurl.com/iR5dt6">στο newsletter</a>
    μας.</p> </div>`;
});
export {
  Contact as C
};
