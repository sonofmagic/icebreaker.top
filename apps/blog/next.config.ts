import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next'
const withMDX = createMDX();
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // output: 'export'
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'icebreaker.top',
          },
          {
            type: 'host',
            value: 'www.icebreaker.top',
          }
        ],
        destination: 'https://blog.icebreaker.top/:path*',
        // Next.js 使用 307 临时重定向和 308 永久重定向状态代码来显式保留所使用的请求方法。
        permanent: true, 
      },
    ]
  },
};

export default withMDX(nextConfig);

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
