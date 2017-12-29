import { Line } from 'vue-chartjs';
/* eslint no-underscore-dangle: ["error", { "allow": ["_chart", "_bar"] }] */
export default {
  extends: Line,
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
        labels: [
          this.labels,
        ],
        datasets: [
          {
            label: this.displayName,
            backgroundColor: '#33FFF9',
            data: this.chartData,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
    },
  },
};
