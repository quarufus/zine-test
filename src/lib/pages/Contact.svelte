<script lang="ts">
  let email = "";

  async function subscribe(event) {
    event.preventDefault();

    console.log("lalala");
    const response: Response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    console.log("ae");
    const result = await response.json();
    if (response.ok) {
      email = "";
      alert("Subscription successful");
    } else {
      alert("Error: " + result.error);
    }
  }
</script>

<div class="p-10">
  <h1 class="my-5">Επικοινωνία</h1>
  <p>
    Το περιοδικό διατίθεται ηλεκτρονικά και μπορείς να το κατεβάσεις δωρεάν....
    Εαν θέλεις μπορείς να <a href="/#">συνεισφέρεις</a> για την μελλοντική
    τύπωση του περιοδικού και το κόστος της ιστοσελίδας και να μας ακολοθήσεις
    στο
    <a href="/#">Φμπ, Ινστα</a>.
  </p>
  <br />
  <br />
  <p>
    Για περισσότερες ανακοινώσεις και ενημερώσεις, κάνε εγγραφή στο newsletter
    μας:
  </p>
  <form method="PUT" on:submit|preventDefault={subscribe} class="my-5">
    <input
      type="email"
      bind:value={email}
      required
      class="border-black border-2 p-1.5"
    />
    <button type="submit" class="relative top-[-5px] mx-5">Εγγραφή</button>
  </form>
</div>
