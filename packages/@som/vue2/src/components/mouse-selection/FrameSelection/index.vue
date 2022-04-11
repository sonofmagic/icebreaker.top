<template>
  <FrameSelection ref="selection" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup">
    <FrameSelectionItem :selected="!item.disabled && (isInTheBoxList[idx] || checkSelected(idx))" v-for="(item, idx) in mockData" :key="item.id">{{ item.id }}</FrameSelectionItem>
  </FrameSelection>
</template>

<script>
import FrameSelection from './selection.vue'
import FrameSelectionItem from './item.vue'
const mockData = new Array(100).fill(0).map((x, idx) => {
  return {
    id: idx,
    disabled: false // Boolean(idx % 2)
  }
})

export default {
  components: {
    FrameSelection,
    FrameSelectionItem
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
      this.innerBoxRectList = this.$refs.selection.getInnerBoxRectList()
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
