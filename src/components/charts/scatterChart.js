import { Scatter } from 'vue-chartjs';
/* eslint no-underscore-dangle: ["error", { "allow": ["_chart", "_bar"] }] */
export default {
  extends: Scatter,
  props: ['data', 'options', 'labels', 'display-name'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData() {
      return this.data;
    },
  },
  watch: {
    data() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderLineChart();
    },
  },
  methods: {
    renderLineChart() {
      this.renderChart({
        datasets: [
          {
            label: this.labels,
            fill: false,
            borderColor: '#f87979',
            backgroundColor: '#f87979',
            data: this.chartData,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
    },
  },
};
