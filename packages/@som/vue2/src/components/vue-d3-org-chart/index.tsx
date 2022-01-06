import { OrgChart } from "d3-org-chart";

interface IDataType {}

// import type {  } from 'd3-org-chart'
import Vue from "vue";
export default Vue.extend({
  name: "Chart",
  props: ["data"],
  data(): {
    chartReference?: OrgChart<IDataType>;
  } {
    return {
      chartReference: undefined,
    };
  },
  render(h) {
    return <div ref="svgElementContainer"></div>;
  },

  watch: {
    data(value) {
      this.renderChart(value);
    },
  },
  created() {},
  methods: {
    renderChart(data: IDataType[] | null) {
      if (!this.chartReference) {
        this.chartReference = new OrgChart();
      }
      this.chartReference
        .container(this.$refs.svgElementContainer as unknown as string) // node or css selector
        .data(data)
        .nodeHeight((d) => 120)
        .onNodeClick((d) => console.log(d + " node clicked"))
        .render();
    },
  },
});
