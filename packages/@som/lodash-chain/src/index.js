// import chain from 'lodash/chain'
import _ from 'lodash'
const users = [
  { user: 'barney', age: 36 },
  { user: 'fred', age: 40 },
  { user: 'pebbles', age: 1 },
]

const youngest = _.chain(users)
  .sortBy('age')
  .map(function (o) {
    return o.user + ' is ' + o.age
  })
  .head()
  .value()

// const youngest = chain(users)
//   .sortBy('age')
//   .map(function (o) {
//     return o.user + ' is ' + o.age
//   })
//   .head()
//   .value()

document.body.innerHTML = youngest
