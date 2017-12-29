import { Pie } from 'vue-chartjs';
/* eslint no-underscore-dangle: ["error", { "allow": ["_chart"] }] */
export default {
  extends: Pie,
  props: ['data', 'options', 'labels', 'background-colors'],
  mounted() {
    this.renderPieChart();
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
      this.renderPieChart();
    },
  },
  methods: {
    renderPieChart() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            backgroundColor: this.backgroundColors,
            data: this.chartData,
          },
        ],
      },
      { responsive: true, maintainAspectRatio: false },
    );
    },
  },
};
