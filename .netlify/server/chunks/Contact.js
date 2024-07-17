import { c as create_ssr_component, b as add_attribute } from "./ssr.js";
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  return `<div class="p-10"><h1 class="my-5" data-svelte-h="svelte-vubfos">Επικοινωνία</h1> <p data-svelte-h="svelte-rpwico">Το περιοδικό διατίθεται ηλεκτρονικά και μπορείς να το κατεβάσεις δωρεάν....
    Εαν θέλεις μπορείς να <a href="/#">συνεισφέρεις</a> για την μελλοντική
    τύπωση του περιοδικού και το κόστος της ιστοσελίδας και να μας ακολοθήσεις
    στο
    <a href="/#">Φμπ, Ινστα</a>.</p> <br> <br> <p data-svelte-h="svelte-lm151q">Για περισσότερες ανακοινώσεις και ενημερώσεις, κάνε <a href="http://eepurl.com/iR5dt6">στο newsletter</a>
    μας.</p> <form method="PUT" class="my-5"><input type="email" required class="border-black border-2 p-1.5"${add_attribute("value", email, 0)}> <button type="submit" class="relative top-[-5px] mx-5" data-svelte-h="svelte-zcu43a">Εγγραφή</button></form></div>`;
});
export {
  Contact as C
};
