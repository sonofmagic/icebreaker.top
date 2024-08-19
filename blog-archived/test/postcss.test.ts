import postcss from 'postcss'
import type { Config } from 'tailwindcss'
import tailwindcss from 'tailwindcss'

describe('postcss', () => {
  it('rpx case 0', async () => {
    const config: Config = {
      content: [
        'p-[0.32rpx]',
        'm-[23.43rpx]',
        'space-y-[12.0rpx]',
        'w-[12rpx]',
        'min-w-[12rpx]',
        'max-w-[12rpx]',
        'h-[12rpx]',
        'min-h-[12rpx]',
        'max-h-[12rpx]',
        'basis-[32rpx]',
        'text-[32rpx]',
      ].map((x) => {
        return {
          raw: x,
        }
      }),
      corePlugins: {
        preflight: false,
      },
    }
    const { css } = await postcss([
      tailwindcss({
        config,
      }),
    ]).process('@tailwind components;@tailwind utilities;', {
      from: undefined,
    })

    expect(css).toMatchSnapshot()
  })
})
