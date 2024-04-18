import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ url }) {
  if (url.pathname == '/') {
	  redirect(300, '/home');
	}
}
