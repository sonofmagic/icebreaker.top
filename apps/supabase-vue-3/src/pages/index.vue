<template>
  <div class="container mx-auto">
    {{ isLogin ? 'Logined' : 'Hello world!' }}
    <div class="2">2</div>
    <div class="a2">a2</div>
    <div class="2b">2b</div>
  </div>
</template>

<script setup lang="ts">
const { isLogin } = useUserStoreRefs()
</script>

<style lang="scss" scoped>
// css 选择器不合法
// .2 {
//   color: blue
// }
// https://www.npmjs.com/package/postcss-selector-parser
// https://www.npmjs.com/package/cssesc
// cssesc('123a2b');
// // → '123a2b'

// cssesc('123a2b', {
//   'isIdentifier': true
// });
// // → '\\31 23a2b'
// 写的时候只需要一个空格，实际上展现在 style /css 文件里是2个\
// .\\32 {
//   color: blue;
// }
.\32 {
  color: blue;
}

.a2 {
  color: red;
}
// CSS.escape('2b')
// '\\32 b'
.\32 b {
  color: yellow;
}
</style>
