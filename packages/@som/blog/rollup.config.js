import alias from '@rollup/plugin-alias'
import {
  isProd, // isDev
} from './client/utils/env.js'
/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 */

const { TARGET } = process.env

const external = [
  'nuxt',
  'express',
  'apollo-server-express',
  'graphql-compose',
  'graphql-compose-mongoose',
  'mongoose',
  'graphql-voyager/middleware',
  'lodash',
  'path',
  'dotenv',
  'zlib',
  'sitemap',
]

function getConfig(target) {
  /**
   * @type {RollupOptions}
   */
  let cfg
  switch (target) {
    case 'gql': {
      cfg = {
        input: isProd
          ? 'client/serverMiddleware/graphql/index.js'
          : `client/serverMiddleware/graphql/listener.js`,
        output: [
          {
            file: 'dist/gql-dev.js',
            //  isProd
            //   ? 'client/serverMiddleware/dist/graphql/index.js'
            //   : `dist/gql-dev.js`,
            format: 'cjs',
            sourcemap: true,
          },
        ],
        plugins: [
          alias({
            entries: [
              {
                find: '~',
                replacement: './',
              },
            ],
          }),
        ],
        external,
      }
      break
    }
    case 'mid': {
      cfg = {
        input: './loadServerMiddleware/index.js',
        output: [
          {
            file: './loadServerMiddleware/dist/index.js',
            format: 'cjs',
            sourcemap: true,
          },
        ],
        plugins: [
          alias({
            entries: [
              {
                find: '~',
                replacement: './',
              },
            ],
          }),
        ],
        external,
      }
      break
    }
    default: {
      cfg = {
        input: `server/${isProd ? 'index' : 'listener'}.js`,
        output: [
          {
            file: `dist/${isProd ? 'app' : 'listener'}.js`,
            format: 'cjs',
            sourcemap: true,
          },
        ],
        plugins: [
          alias({
            entries: [
              {
                find: '~',
                replacement: './',
              },
            ],
          }),
        ],
        external,
      }
      break
    }
  }
  return cfg
}

export default getConfig(TARGET)
