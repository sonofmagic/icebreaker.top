# @nuxtjs/monaco-editor

> Efficient Moment.js integration for Nuxt.js

[📖 **Release Notes**](./CHANGELOG.md)

## Features

- Remove unused Moment.js locales using [moment-locales-webpack-plugin](https://github.com/iamakulov/moment-locales-webpack-plugin) for much less bundle size.
- Inject `$moment` to the context everywhere.

## Setup

1. Add `@nuxtjs/moment` dependency to your project

```bash
yarn add --dev @nuxtjs/moment # or npm install --save-dev @nuxtjs/moment
```

2. Add `@nuxtjs/moment` to the `buildModules` section of `nuxt.config.js`

```js
export default {
  buildModules: [
    // Simple usage
    '@nuxtjs/moment',

    // With options
    [
      '@nuxtjs/moment',
      {
        /* module options */
      },
    ],
  ],
}
```

:warning: If you are using Nuxt **< v2.9** you have to install the module as a `dependency` (No `--dev` or `--save-dev` flags) and use `modules` section in `nuxt.config.js` instead of `buildModules`.

### Using top level options

```js
export default {
  buildModules: ['@nuxtjs/moment'],
  moment: {
    /* module options */
  },
}
```

### Typescript setup

Add the types to your `"types"` array in `tsconfig.json` after the `@nuxt/types` entry.

:warning: Use `@nuxt/vue-app` instead of `@nuxt/types` for nuxt < 2.9.

#### tsconfig.json

```json
{
  "compilerOptions": {
    "types": ["@nuxt/types", "@nuxtjs/moment"]
  }
}
```

> **Why?**
>
> For typescript to be aware of the additions to the `nuxt Context`, the `vue instance` and the `vuex store`, the types need to be merged via [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html) by adding `@nuxtjs/moment` to your types.

## Configuration

To strip all locales except `en`:

```js
export default {
  buildModules: ['@nuxtjs/moment'],
}
```

To strip all locales except `en`, `fr` and `fa`:

```js
export default {
  buildModules: ['@nuxtjs/moment'],
  moment: {
    locales: ['fa'],
  },
}
```

**Note:** `en` is built into Moment and can’t be removed!

### Set default locale

You can set a default locale via the `defaultLocale` option. It must be included
int the locales you keep (or `'en'`) and will only work when using the plugin option.

```js
export default {
  buildModules: ['@nuxtjs/moment'],
  moment: {
    defaultLocale: 'de',
    locales: ['de'],
  },
}
```

### Plugins

You can import plugins to moment. See a list of [plugins](https://momentjs.com/docs/#/plugins/)

```js
export default {
  buildModules: ['@nuxtjs/moment'],
  moment: {
    plugins: ['moment-strftime', 'moment-fquarter'],
  },
}
```

## License

[MIT License](./LICENSE)

Copyright (c) Nuxt Community
