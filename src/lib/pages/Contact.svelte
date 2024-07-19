<script lang="ts">
  import { _ } from "svelte-i18n";
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
  <h1 class="my-5">{$_("contact_page.content.heading")}</h1>
  <p>
    {@html $_("contact_page.content.p1")}
  </p>
  <br />
  <br />
  <p>
    {@html $_("contact_page.content.p2")}
  </p>
  <div class="flex justify-center m-5">
    <form method="PUT" on:submit|preventDefault={subscribe} class="my-5">
      <input
        type="email"
        bind:value={email}
        required
        class="border-black border-2 p-1.5 me-5"
      />
      <button type="submit" class="relative top-[-5px] my-5"
        >{$_("contact_page.content.subscribe")}</button
      >
    </form>
  </div>
</div>
