import type { NextConfig } from 'next'

/*
 * Two ways to build. With PAGES_BASE_PATH set (the public GitHub Pages
 * build, see .github/workflows/pages.yml), it's a static export under that path: every page as an
 * HTML file in out/, images served as they are, and page URLs that end in a
 * slash so a page and its folder don't collide.
 * Without it (local dev, npm run check), it's the ordinary app at the root.
 *
 * agentRules is off so next dev doesn't append its own block to CLAUDE.md.
 * That block has em dashes, which this repo's dash check forbids.
 */
const base = process.env.PAGES_BASE_PATH ?? ''

const nextConfig: NextConfig = base
  ? {
      agentRules: false,
      output: 'export',
      basePath: base,
      trailingSlash: true,
      images: { loader: 'custom', loaderFile: './image-loader.ts' },
      env: { NEXT_PUBLIC_BASE_PATH: base },
    }
  : { agentRules: false }

export default nextConfig
