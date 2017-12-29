/* eslint linebreak-style: ["off", "windows"] */
import { Scatter, mixins } from 'vue-chartjs';

export default {
  extends: Scatter,
  mixins: [mixins.reactiveProp],
  props: ['options'],
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  methods: {},
};
