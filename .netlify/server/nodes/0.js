import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.8_TXelA2.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.CopRQlsA.js"];
export const stylesheets = ["_app/immutable/assets/0.BrOK6uEM.css"];
export const fonts = ["_app/immutable/assets/IFDurerDisplay.DdpH_Ire.woff","_app/immutable/assets/Inter-Medium.BwjKAC5m.woff"];
