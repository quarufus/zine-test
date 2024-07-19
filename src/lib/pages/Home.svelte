<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<div class="p-10">
  <h1 class="my-5">{$_("home_page.content.heading")}</h1>
  <p>
    {$_("home_page.content.paragraph")}
    <br />
    <br />
    {$_("home_page.content.paragraph2")}
  </p>
</div>
