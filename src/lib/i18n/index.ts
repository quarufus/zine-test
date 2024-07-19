import { browser } from "$app/environment";
import { init, register } from "svelte-i18n";

const defaultLocale = "el";

register("English", () => import("./locales/en.json"));
register("Greek", () => import("./locales/el.json"));

init({
  fallbackLocale: defaultLocale,
  //initialLocale: browser ? window.navigator.language : defaultLocale,
});
