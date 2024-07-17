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
		client: {"start":"_app/immutable/entry/start.DWKePZgV.js","app":"_app/immutable/entry/app.F72-7QZO.js","imports":["_app/immutable/entry/start.DWKePZgV.js","_app/immutable/chunks/entry.CHeHEepM.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.DpTTYn6m.js","_app/immutable/entry/app.F72-7QZO.js","_app/immutable/chunks/scheduler.dvEmg_18.js","_app/immutable/chunks/index.CopRQlsA.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js'))
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
			},
			{
				id: "/(zines)/zines/[issue]",
				pattern: /^\/zines\/([^/]+?)\/?$/,
				params: [{"name":"issue","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
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
