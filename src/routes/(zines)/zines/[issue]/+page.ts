/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        slug: params.issue
    }
}
