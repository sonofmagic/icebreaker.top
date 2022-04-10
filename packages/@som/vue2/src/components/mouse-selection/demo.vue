<template>
  <div id="app">
    <div class="options">
      <span>左侧容器内框选</span>
      <input type="radio" id="disabled" value="disabled" v-model="usable" />
      <label for="disabled">不可用</label>
      <input type="radio" id="able" value="able" v-model="usable" />
      <label for="able">可用</label>
      <button @click="destroyRight" style="margin-left: 20px">注销右侧框选</button>
      <span>注销后，右侧内部框选失效，但是作用在document上的还存在</span>
      <button @click="handleShowModal">显示弹窗</button>
    </div>
    <div class="box">
      <div v-if="mode === 'wrapper'" class="test-box test-inner-wrapper">
        <div class="wrapper left-wrapper" :class="{ 'selected-wrapper': isInTheBoxWrapList[0] }">
          <div class="inner-box" :class="{ 'selected-box': isInTheBoxList[i - 1], disabled: i === 2 }" v-for="i in 50" :id="`left_inner_box_${i}`" :key="`left_${i}`">{{ i === 2 ? '这个不能触发框选' : '' }}</div>
        </div>
        <div class="wrapper right-wrapper" :class="{ 'selected-wrapper': isInTheBoxWrapList[1] }"></div>
      </div>
      <div v-else class="test-box test-full-page">可以自定义框选矩形样式</div>
    </div>
    <div v-show="showModal" class="modal">
      <div ref="content" class="content"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MouseSelection from './lib/index'
// import MouseSelection from '../dist/index'
interface CustomRect {
  left: number
  top: number
  width: number
  height: number
}
@Component({
  data () {
    return {
      mode: 'wrapper'
    }
  }
})
export default class App extends Vue {
  public wrapperMouseSelection!: MouseSelection
  public rightWrapperMouseSelection!: MouseSelection
  public documentSelection!: MouseSelection
  public selectionPageRect!: object
  public isInTheBoxList: boolean[] = []
  public isInTheBoxWrapList: boolean[] = []
  public innerBoxRectList: CustomRect[] = []
  public showModal = false
  public usable = 'able'
  public isInnerSelection () {}
  public $refs: {
    content: HTMLElement
  }

  public destroyRight () {
    this.rightWrapperMouseSelection.destroy()
  }

  public handleShowModal () {
    this.showModal = true
    setTimeout(() => {
      this.rightWrapperMouseSelection = new MouseSelection(this.$refs.content, {
        stopPropagation: true
      })
    }, 500)
  }

  protected mounted () {
    this.wrapperMouseSelection = new MouseSelection(document.querySelector('.left-wrapper'), {
      onMousedown: () => {
        this.innerBoxRectList = (Array.from(document.querySelectorAll('.inner-box')) as HTMLElement[]).map((node: HTMLElement) => {
          return {
            left: node.offsetLeft,
            top: node.offsetTop,
            width: node.offsetWidth,
            height: node.offsetHeight
          }
        })
      },
      onMousemove: () => {
        this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
          return this.wrapperMouseSelection.isInTheSelection(rect)
        })
      },
      onMouseup: () => {
        this.isInTheBoxList = []
      },
      disabled: () => this.usable === 'disabled',
      stopSelector: 'div.disabled',
      stopPropagation: true
    })
    this.rightWrapperMouseSelection = new MouseSelection(document.querySelector('.right-wrapper'), {
      className: 'right-wrapper-selection',
      stopPropagation: true
    })
    // this.documentSelection = new MouseSelection(document, {
    //     onMousedown: () => {
    //       this.innerBoxRectList = (Array.from(
    //         document.querySelectorAll(".wrapper")
    //       ) as HTMLElement[]).map((node: HTMLElement) => {
    //         return node.getBoundingClientRect()
    //       });
    //     },
    //     onMousemove: (event) => {
    //       this.isInTheBoxWrapList = this.innerBoxRectList.map(rect => {
    //         return this.documentSelection.isInTheSelection(rect);
    //       });
    //     },
    //     onMouseup: () => {
    //       this.isInTheBoxWrapList = [];
    //     },
    //   }
    // );
  }
}
</script>

<style lang="less">
.full-screen {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  .full-screen;
  .options {
    padding: 16px;
  }
  .box {
    position: absolute;
    height: ~'calc(100% - 50px)';
    //模拟浏览器滚动条的情况 : width设置Wie1500px;
    width: 100%;
    top: 50px;
    .test-box {
      .full-screen;
      .wrapper {
        width: ~'calc(50% - 15px)';
        height: ~'calc(100% - 20px)';
        position: absolute;
        top: 10px;
        background: rgba(255, 192, 203, 0.3);
        &.selected-wrapper {
          background: rgba(255, 192, 203, 0.5);
        }
        .inner-box {
          width: 100px;
          height: 100px;
          background: rgba(255, 192, 203, 0.3);
          display: inline-block;
          margin-left: 20px;
          margin-top: 20px;
          vertical-align: top;
          &.selected-box {
            background: rgba(255, 192, 203, 1);
          }
        }
        &.left-wrapper {
          left: 10px;
          overflow: scroll;
        }
        &.right-wrapper {
          right: 10px;
        }
      }
    }
  }
}
.right-wrapper-selection {
  border-style: dashed !important;
}
.modal {
  position: fixed;
  width: 700px;
  height: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: bisque;
  z-index: 999;
  .content {
    width: 500px;
    height: 100%;
    background: darkkhaki;
    float: right;
    // position: relative;
  }
}
</style>
