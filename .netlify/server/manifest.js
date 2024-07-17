export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["IFDurerDisplay-Regular [tёIeģrа₥  -  @ałI4deşígñеr]  .woff","Inter-Medium.woff","fav.png","favicon.png","strings.json","svelte.svg"]),
	mimeTypes: {".woff":"font/woff",".png":"image/png",".json":"application/json",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.DVVHXyC-.js","app":"_app/immutable/entry/app.C6JDzYym.js","imports":["_app/immutable/entry/start.DVVHXyC-.js","_app/immutable/chunks/entry.BlGWokkr.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.DpTTYn6m.js","_app/immutable/entry/app.C6JDzYym.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.DBDvKfRK.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/(app)/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/_server.ts.js'))
			},
			{
				id: "/(app)/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/end",
				pattern: /^\/end\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(zines)/zines",
				pattern: /^\/zines\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
