import { defineComponent } from 'vue-demi'

export const ValueSelector = defineComponent({
  name: 'ValueSelector',
  render() {
    const arr = new Array(20).fill(0).map((_, idx) => idx)
    return (
      <div class="bg-white">
        未定义
        <input />
        {arr.map((x) => {
          return <div>{x}</div>
        })}
      </div>
    )
  }
})
