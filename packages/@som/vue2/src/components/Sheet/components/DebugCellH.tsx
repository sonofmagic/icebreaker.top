import { defineComponent, ref } from 'vue-demi'
import { useElementBounding } from '@vueuse/core'
export default defineComponent({
  name: 'DebugCell',
  setup() {
    const domRef = ref<HTMLDivElement | null>()
    const { left, top } = useElementBounding(domRef)
    return () => {
      return <div ref={domRef} class="h-full w-full">{`left:${left.value},top:${top.value}`}</div>
    }
  }
})
