import { derived } from "svelte/store";
import { dictionary, locale, _ } from "svelte-i18n";

const MESSAGE_FILE_URL_TEMPLATE = "/lang/{locale}.json";

let cachedLocale;

function setupI18n({ withLocale: _locale } = { withLocale: "el" }) {
  const messagesFileUrl = MESSAGE_FILE_URL_TEMPLATE.replace(
    "{locale}",
    _locale,
  );

  return fetch(messagesFileUrl)
    .then((response) => response.json())
    .then((messages) => {
      dictionary.set({ [_locale]: messages });
      cachedLocale = _locale;
      locale.set(_locale);
    });
}
export { _, locale, setupI18n };
