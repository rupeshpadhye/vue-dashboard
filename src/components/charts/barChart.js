import { Bar } from 'vue-chartjs';
/* eslint no-underscore-dangle: ["error", { "allow": ["_chart"] }] */
export default {
  extends: Bar,
  props: ['data', 'options', 'labels', 'background-colors', 'display-name'],
  mounted() {
    this.renderBarChart();
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
      this.renderBarChart();
    },
  },
  methods: {
    renderBarChart() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: this.displayName,
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
