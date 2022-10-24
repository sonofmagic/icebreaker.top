import { computed, defineComponent, ref, onMounted, Ref, PropType, toRefs, watch, nextTick } from 'vue-demi'
import { ISelectionContext } from './type'
export const Selection = defineComponent({
  name: 'CellSelection',
  props: {
    context: {
      type: Object as PropType<ISelectionContext>
    },
    styleObject: {
      type: Object
    }
  },
  setup(props) {
    const { context, styleObject } = toRefs(props)
    const dom = ref<HTMLDivElement>()
    const flag = ref(false)

    watch(
      () => {
        return dom.value
      },
      () => {
        if (context.value) {
          context.value.el = dom.value
        }
      }
    )
    const unwatch = watch(
      () => {
        return styleObject.value
      },
      () => {
        flag.value = true
        unwatch()
      }
    )
    return {
      dom,
      flag
    }
  },
  render() {
    return this.flag ? <div ref="dom" style={this.styleObject} class="absolute ring-2 ring-offset-0 ring-blue-600 pointer-events-none bg-gray-900 bg-opacity-10 left-0 top-0"></div> : undefined
  }
})
