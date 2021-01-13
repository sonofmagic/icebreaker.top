export default {
  input: 'src/index.js',
  output: {
    file: 'dist/main.cjs.js',
    format: 'cjs',
    sourcemap: true,
  },
  external: ['@cloudbase/node-sdk', '@cloudbase/manager-node'] //['@cloudbase/manager-node']
}