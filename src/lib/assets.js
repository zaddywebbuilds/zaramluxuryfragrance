/**
 * Resolve a public-folder asset against the deploy base path.
 * Needed because the site deploys under /zaramluxuryfragrance/ on
 * GitHub Pages — absolute paths like /products/x.jpg would 404 there.
 */
export const asset = (path) => import.meta.env.BASE_URL + String(path).replace(/^\//, '')
