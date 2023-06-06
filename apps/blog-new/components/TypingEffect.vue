<template>
  <div class="typing-effect-wrapper">
    <p>
      ice breaker is
      <span
        ref="typedTextSpanRef"
        class="typed-text text-sky-600 dark:text-sky-400" />
      <span ref="cursorSpanRef" class="cursor">&nbsp;</span>
    </p>
  </div>
</template>

<script setup lang="ts">
const typedTextSpanRef = ref<Element>()
const cursorSpanRef = ref<Element>()

const textArray = [
  'aggressive',
  'ambitious',
  'adroit',
  'amiable',
  'amicable',
  'aspiring',
  'brilliant',
  'capable',
  'contemplative',
  'cultured',
  'dashing',
  'determined',
  'dependable',
  'dynamic',
  'enthusiastic',
  'genteel',
  'humble',
  'independent',
  'industrious',
  'ingenious',
  'intellective',
  'intelligent',
  'inventive',
  'modest',
  'motivated',
  'optimistic',
  'reliable',
  'temperate',
  'virtuous',
  'the son of magic'
]
const typingDelay = 200
const erasingDelay = 100
const newTextDelay = 2000
let textArrayIndex = 0
let charIndex = 0
const ptr = ref()
function setTO(callback: () => void, ms?: number) {
  ptr.value = setTimeout(callback, ms)
}
function clearOT() {
  clearTimeout(ptr.value)
  ptr.value = undefined
}

function doTyping() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpanRef.value.classList.contains('typing'))
      cursorSpanRef.value.classList.add('typing')
    typedTextSpanRef.value.textContent +=
      textArray[textArrayIndex].charAt(charIndex)
    charIndex++
    setTO(doTyping, typingDelay)
  } else {
    cursorSpanRef.value.classList.remove('typing')
    setTO(erase, newTextDelay)
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpanRef.value.classList.contains('typing'))
      cursorSpanRef.value.classList.add('typing')
    typedTextSpanRef.value.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    )
    charIndex--
    setTO(erase, erasingDelay)
  } else {
    cursorSpanRef.value.classList.remove('typing')
    textArrayIndex++
    if (textArrayIndex >= textArray.length) textArrayIndex = 0
    setTO(doTyping, typingDelay + 1100)
  }
}
onMounted(() => {
  if (textArray.length) {
    setTO(doTyping, newTextDelay + 250)
  }
})

onBeforeUnmount(() => {
  clearOT()
})
</script>

<style lang="scss" scoped>
.typing-effect-wrapper {
  p {
    overflow: hidden;

    .cursor {
      display: inline-block;
      background-color: #ccc;
      margin-left: 0.1rem;
      width: 3px;
      animation: blink 1s infinite;

      &.typing {
        animation: none;
      }
    }
  }
}

@keyframes blink {
  0% {
    background-color: #ccc;
  }

  49% {
    background-color: #ccc;
  }

  50% {
    background-color: transparent;
  }

  99% {
    background-color: transparent;
  }

  100% {
    background-color: #ccc;
  }
}
</style>
