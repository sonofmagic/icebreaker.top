<template>
  <div class="container mx-auto">
    {{ isLogin ? 'Logined' : 'Hello world!' }}
    <div class="2xl:text-base">2xl:text-base</div>
    <div class="-3:2yo:ur[x'\ds]">-3:2yo:ur[x'\ds]</div>
    <div class="2">2</div>
    <div class="a2">a2</div>
    <div class="2b">2b</div>
    <div class="2g">2g</div>
    <div class="-2g">-2g</div>
    <div class="-">-</div>
    <div class="♥">♥</div>
    <div class="𝌆1a">𝌆1a</div>
    <div class="你和𝌆1a">你和𝌆1a</div>
    <div :class="slashZero">{{ slashZero }}</div>
    <div :class="xx">{{ xx }}</div>
    <div class="a�b">a�b</div>
    <div class="émotion">émotion</div>
  </div>
</template>

<script setup lang="ts">
const { isLogin } = useUserStoreRefs()
const slashZero = 'a\0b'
const xx = '\x80\x2D\x5F\xA9'
</script>

<style>
/* // css 选择器不合法
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
// https://github.com/mathiasbynens/CSS.escape/blob/master/tests/tests.js
// https://github.com/mathiasbynens/cssesc
// https://www.w3.org/International/questions/qa-escapes
// https://www.w3.org/International/questions/qa-escapes#css_identifiers
// https://www.w3.org/TR/css-syntax-3/#escaping
// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram

// acsii 码中 48 - 57 代表 0-9 的字符
// 转换成16进制就是 \30 - \39 */

.-\33\:2yo\:ur\[x\'\\ds\]{
  color: red;
}

.\32 {
  color: red;
}


.a2 {
  color: red;
}

/* // CSS.escape('2b')
// '\\32 b' */
.\32 b {
  color: red;
}

.♥ {
  color: red;
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

/* // .a\\\uFFFD b{
//   color: red;
// } */


.\- {
  color: red;
}

/* .a�b {
  color: red;
} */

/* // .ab {
//   color: red;
// }
// .a\uFFFDb {
//   color: red;
// }

// .a�b {
//   color: red;
// } */

/* .a\000000b {
  color: red;
} */

.a\00fffdb {
  color: red;
}

/* .a�b{
  color:blue;
} */

/*
// .\x80\x2D\x5F\xA9 {
//   color: red;
// }
// .\x80-_© {
//   color: red;
// } */
.\80\2D\5F\A9 {
  color: red;
}

.émotion {
  color: red;
}

/* // .a\uFFFDb {
//   color: red;
// }

// .a\0 b {
//   color: red;
// } */
</style>
