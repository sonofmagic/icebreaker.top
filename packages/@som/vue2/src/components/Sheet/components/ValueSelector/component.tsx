import { defineComponent, ref } from 'vue-demi'

export const ValueSelector = defineComponent({
  name: 'ValueSelector',
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  },
  render() {
    const arr = new Array(20).fill(0).map((_, idx) => idx)
    return (
      <div style={{ visibility: this.visible ? 'visible' : 'hidden' }} class="bg-white w-[360px] border absolute left-0 top-0">
        未定义
        <input class="border" placeholder="请输入" />
        <div class="overflow-auto h-[200px]">
          {arr.map((x) => {
            return <div>{x}</div>
          })}
        </div>
      </div>
    )
  }
})
