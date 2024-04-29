import {writable} from 'svelte/store';

export const store = writable({
  index: 0
});

export function setIndex(index) {
  store.set({
    index: index
  });
  index = index;
}

export const readerSettings = writable({
  theme: 'Dark',
  fontFamily: '',
  fontSize: 0,
  letterSpacing: 12
});

export function setReaderSettings(settings) {
  readerSettings.set({
    theme: settings.theme,
    fontFamily: settings.fontFamily,
    fontSize: settings.fontSize,
    letterSpacing: settings.letterSpacing
  });
  settings = settings;
}

export function setTheme(theme) {
  readerSettings.set({
    theme: theme
  });
  theme = theme;
}

export function setFontFamily(fontFamily) {
  //console.log(fontFamily);
  readerSettings.set({
    fontFamily: fontFamily
  });
  fontFamily = fontFamily;
}

export function setFontSize(fontSize) {
  console.log(fontSize);
  readerSettings.set({
    fontSize: fontSize,
  });
  fontSize = fontSize;
}

export function setLetterSpacing(letterSpacing) {
  readerSettings.set({
    letterSpacing: letterSpacing
  });
  letterSpacing = letterSpacing;
}
