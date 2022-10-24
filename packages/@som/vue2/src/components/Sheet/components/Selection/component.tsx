import { computed, defineComponent, ref, onMounted, Ref } from 'vue-demi'

export const Selection = defineComponent({
  name: 'CellSelection',
  render() {
    return <div class="absolute ring-2 ring-offset-0 ring-blue-600 pointer-events-none bg-gray-900 bg-opacity-10"></div>
  }
})
