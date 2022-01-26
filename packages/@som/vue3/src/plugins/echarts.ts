import type { Plugin } from 'vue'
import { use } from 'echarts/core'
import {
  CanvasRenderer,
  SVGRenderer
} from 'echarts/renderers'
import {
  BarChart,
  PieChart
} from 'echarts/charts'

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'
const plugin:Plugin = {
  install (app, options) {
    use([
      CanvasRenderer,
      SVGRenderer,
      BarChart,
      GridComponent,
      TooltipComponent,
      PieChart,
      TitleComponent,
      LegendComponent
    ])
  }
}

export default plugin
