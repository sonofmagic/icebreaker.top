import { computed, defineComponent, ref, onMounted, Ref, PropType, toRefs } from 'vue-demi'
import { ISelectionContext } from './type'
export const Selection = defineComponent({
  name: 'CellSelection',
  props: {
    context: {
      type: Object as PropType<ISelectionContext>
    }
  },
  setup(props) {
    const { context } = toRefs(props)
    const dom = ref<HTMLDivElement>()
    onMounted(() => {
      if (context.value) {
        context.value.el = dom.value
        // context.value.getBoundingClientRect = dom.value?.getBoundingClientRect
      }
    })
    return {
      dom
    }
  },
  render() {
    return <div ref="dom" class="absolute ring-2 ring-offset-0 ring-blue-600 pointer-events-none bg-gray-900 bg-opacity-10"></div>
  }
})
