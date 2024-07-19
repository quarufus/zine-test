import { browser } from "$app/environment";
import "$lib/i18n";
import { locale, waitLocale } from "svelte-i18n";

export const prerender = false;

export const load = async () => {
  if (browser) {
    locale.set("Greek");
  }
  await waitLocale();
};
