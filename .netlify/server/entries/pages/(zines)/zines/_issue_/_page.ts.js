function load({ params }) {
  return {
    slug: params.issue
  };
}
function entries() {
  return [
    { issue: "One" },
    { issue: "Two" },
    { issue: "Three" },
    { issue: "Four" },
    { issue: "Five" }
  ];
}
const prerender = true;
export {
  entries,
  load,
  prerender
};
