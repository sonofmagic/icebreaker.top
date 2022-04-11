<template>
  <FrameSelection ref="selection" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup">
    <div class="inner-box" :class="{ selected: !item.disabled && (isInTheBoxList[idx] || checkSelected(idx)) }" v-for="(item, idx) in mockData" :key="item.id">{{ item.id }}</div>
  </FrameSelection>
</template>

<script>
import FrameSelection from './selection.vue'

const mockData = new Array(100).fill(0).map((x, idx) => {
  return {
    id: idx,
    disabled: false // Boolean(idx % 2)
  }
})
// import FrameSelectionItem from './FrameSelection/item.vue'
export default {
  components: {
    FrameSelection
    // FrameSelectionItem
  },
  data () {
    return {
      isInTheBoxList: [],

      innerBoxRectList: [],

      selectedSet: new Set(),

      mockData
    }
  },
  methods: {
    checkSelected (id) {
      return this.selectedSet.has(id)
    },
    onMousedown () {
      this.isClick = true

      this.innerBoxRectList = Array.from(document.querySelectorAll('.inner-box')).map((node) => {
        return {
          left: node.offsetLeft,
          top: node.offsetTop,
          width: node.offsetWidth,
          height: node.offsetHeight
        }
      })
    },

    onMousemove () {
      this.isClick = false
      this.inBoxSync()
    },
    onMouseup () {
      if (this.isClick) {
        this.inBoxSync()
      }

      this.isInTheBoxList
        .reduce((acc, cur, idx) => {
          if (cur) {
            acc.push(idx)
          }
          return acc
        }, [])
        .forEach((x) => {
          if (!this.mockData[x].disabled) {
            this.selectedSet.add(x)
          }
        })

      this.isInTheBoxList = []
      this.isClick = false
    },
    inBoxSync () {
      this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
        return this.$refs.selection.isInTheSelection(rect)
      })
    }
  },
  created () {
    this.isClick = false
  }
}
</script>

<style lang="scss" scoped>
.inner-box {
  width: 40px;
  height: 40px;
  background: rgba(255, 192, 203, 0.3);
  display: inline-block;
  margin-left: 20px;
  margin-top: 20px;
  vertical-align: top;
  user-select: none;
  &.selected {
    background: rgba(255, 192, 203, 1);
  }
}
</style>
