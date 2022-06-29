使用 `lodash/chain` 时

`import chain from 'lodash/chain'`

只会引入 `lodash/chain` 本身依赖的方法

所以 

```js
const youngest = chain(users)
  .sortBy('age')
  .map(function (o) {
    return o.user + ' is ' + o.age
  })
  .head()
  .value()
```

执行到 `sortBy` 就会报错了

但是 `import _ from 'lodash'` 全量引入太大了

链式调用这么说还是听不方便和，和 `tree-shaking` 有些冲突

所以结论就是，只有单独使用的时候，才用 `import xxx from 'lodash/xxx'`

链式调用不会自动把链式调的方法打包进来