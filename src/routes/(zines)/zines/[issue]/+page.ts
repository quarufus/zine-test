/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        slug: params.issue
    }
}

/** @type {import('./$types').EntryGenerator} */
export function entries() {
	return [
		{ issue: 'One' },
		{ issue: 'Two' },
        { issue: 'Three' },
        { issue: 'Four' },
        { issue: 'Five' }
	];
}

export const prerender = true;
