import type { NextConfig } from 'next'
import path from 'node:path'
// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

import { createMDX } from 'fumadocs-mdx/next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'export',
  turbopack: {
    root: path.resolve(__dirname, '../..'),
  },
}

const withMDX = createMDX()

export default withMDX(nextConfig)
initOpenNextCloudflareForDev()
