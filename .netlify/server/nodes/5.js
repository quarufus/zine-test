

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.BDw1y0k5.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.CopRQlsA.js","_app/immutable/chunks/entry.hjQyDyVO.js","_app/immutable/chunks/index.DpTTYn6m.js"];
export const stylesheets = [];
export const fonts = [];