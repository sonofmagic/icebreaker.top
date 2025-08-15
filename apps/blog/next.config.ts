import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next'
const withMDX = createMDX();
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'export'
};

export default withMDX(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
