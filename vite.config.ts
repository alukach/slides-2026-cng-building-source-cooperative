// Slidev 53's bundled CSS trips lightningcss minification; esbuild handles it.
// Plain object (no `import from 'vite'`) so it works under pnpm's strict layout,
// where vite is not a direct dependency.
export default {
  build: { cssMinify: 'esbuild' },
}
