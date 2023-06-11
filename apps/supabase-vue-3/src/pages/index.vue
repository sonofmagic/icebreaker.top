<template>
  <div class="container mx-auto">
    {{ isLogin ? 'Logined' : 'Hello world!' }}
    <div class="2xl:text-base">2xl:text-base</div>
    <div class="2">2</div>
    <div class="a2">a2</div>
    <div class="2b">2b</div>
    <div class="2g">2g</div>
    <div class="-2g">-2g</div>
    <div class="♥">♥</div>
    <div class="𝌆1a">𝌆1a</div>
    <div class="你和𝌆1a">你和𝌆1a</div>
    <div class="a\0b">a\0b</div>
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

.♥ {
  color: yellow;
}

.𝌆1a {
  color: red;
}

.你和𝌆1a {
  color: red;
}

.\32 g {
  color: red;
}

.-\32 g {
  color: red;
}

// .a\\\uFFFD b{
//   color: red;
// }
.a�b {
  color: red;
}
</style>
