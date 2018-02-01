<template>
  <div class="content">
    <md-layout class="chart-area">
      <md-layout md-gutter>
        <md-card md-with-hover>
          <md-card-header>
            <div class="md-title">Line Chart</div>
            <div class="md-subhead">
              <span v-if="isLineChartConnected" class="green">connected </span>
              <span v-else class="red">Service unavailble</span>
            </div>
          </md-card-header>
          <md-card-content>
            <line-chart :data="lineChartData" :options="{responsive: true, maintainAspectRatio: true}" :labels="lineChartLabels" :display-name="lineChartDisplayName"></line-chart>
          </md-card-content>
        </md-card>
      </md-layout>
      <md-layout>
        <md-card>
          <md-card-header>
            <div class="md-title">Pie Chart</div>
            <div class="md-subhead">
              <span v-if="isPieChartConnected" class="green">connected </span>
              <span v-else class="red">Service unavailble</span>
            </div>
          </md-card-header>
          <md-card-content>
            <pie-chart :data="pieChartData" :options="{responsive: true, maintainAspectRatio: false}" :labels="pieChartLabels" :background-colors="['#41B883', '#E46651', '#00D8FF', '#DD1B16']"></pie-chart>
          </md-card-content>
        </md-card>
      </md-layout>
      <md-layout>
        <md-card md-with-hover>
          <md-card-header>
            <div class="md-title">Scatter Chart</div>
            <div class="md-subhead">
              <span v-if="isScatterChartConnected" class="green">connected </span>
              <span v-else class="red">Service unavailble</span>
            </div>
          </md-card-header>
          <md-card-content>
            <scatter-chart :data="scatterChartData" :options="{responsive: true, maintainAspectRatio: true}" :labels="scatterChartLabels"></scatter-chart>
          </md-card-content>
        </md-card>
      </md-layout>
      <md-layout>
        <md-card md-with-hover>
          <md-card-header>
            <div class="md-title">Bar Chart</div>
            <div class="md-subhead">
              <span v-if="isBarChartConnected" class="green">connected </span>
              <span v-else class="red">Service unavailble</span>
            </div>
          </md-card-header>
          <md-card-content>
            <bar-chart :data="barChartData" :options="{responsive: true, maintainAspectRatio: true}" :labels="barChartLabels" :display-name="barChartDisplayName" background-colors="#FF3F33"></bar-chart>
          </md-card-content>
        </md-card>

      </md-layout>
    </md-layout>
    <md-layout md-gutter>
     <md-layout md-flex="30">
        <md-card class="margin-1">
          <md-card-header>
            <div class="md-title">Tabular Data</div>
          </md-card-header>
          <md-card-content>
            <table-view :headers="tableHeaders" :table-data="tableData"></table-view>
          </md-card-content>
        </md-card>
      </md-layout> 
      <md-layout md-flex="70">
        <md-card class="margin-1">
          <md-card-header>
            <div class="md-title">Vue.js Lifecycle</div>
            <div class="md-subhead">
            </div>
          </md-card-header>
          <md-card-content>
            <vue-life-cycle></vue-life-cycle>
          </md-card-content>
        </md-card>
      </md-layout>
    </md-layout>

    </md-layout>

  </div>
</template>
<script>
import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import Api from '@/config/endpoints';
import lineChart from '@/components/charts/lineChart';
import barChart from '@/components/charts/barChart';
import scatterChart from '@/components/charts/scatterChart';
import pieChart from '@/components/charts/pieChart';
import VueLifeCycle from '@/components/VueLifeCycle';
import TableView from '@/components/TableView';
import tabularData from '@/services/tabular_data';

/* eslint prefer-template: "off" */
Vue.use(VueSocketIO, socketio(Api.BASE_URL, {
  query: 'token=' + localStorage.getItem('token'),
}));

export default {
  name: 'HomeDashboard',
  components: { lineChart,
    barChart,
    scatterChart,
    pieChart,
    VueLifeCycle,
    TableView },
  data() {
    return {
      lineChartData: [],
      pieChartData: [],
      barChartData: [],
      scatterChartData: [],
      isLineChartConnected: false,
      isPieChartConnected: false,
      isBarChartConnected: false,
      isScatterChartConnected: false,
      lineChartLabels: '',
      lineChartDisplayName: '',
      pieChartLabels: [],
      barChartLabels: [],
      scatterChartLabels: [],
      barChartDisplayName: '',
      singleListData: [],
      tableData: [],
      tableHeaders: [],
    };
  },
  sockets: {
    connect() {
      this.isLineChartConnected = true;
      this.isPieChartConnected = true;
      this.isBarChartConnected = true;
      this.isScatterChartConnected = true;
    },
    disconnect() {
      this.isLineChartConnected = false;
      this.isPieChartConnected = false;
      this.isBarChartConnected = false;
      this.isScatterChartConnected = false;
    },
    line_chart_data(data) {
      this.isLineChartConnected = true;
      this.lineChartDisplayName = data.displayName;
      this.lineChartLabels = data.labels;
      this.lineChartData = data.datapoints;
    },
    pie_chart_data(data) {
      this.isPieChartConnected = true;
      this.pieChartLabels = data.labels;
      this.pieChartData = data.datapoints;
    },
    bar_chart_data(data) {
      this.isBarChartConnected = true;
      this.barChartDisplayName = data.displayName;
      this.barChartLabels = data.labels;
      this.barChartData = data.datapoints;
    },
    scatter_chart_data(data) {
      this.isScatterChartConnected = true;
      this.scatterChartData = data.datapoints;
      this.scatterChartLabels = data.labels;
    },
    unauthorized(error) {
      if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
        console.log('User\'s token has expired');
        this.$router.push('/login');
      }
    },
  },
  created() {
    tabularData.getTabularData().then((response) => {
      this.tableHeaders = response.data.headers;
      this.tableData = response.data.items;
    }).catch((error) => {
      console.log(error);
    });
  },
  mounted() {
    this.lineChartWebSocket();
    this.pieChartWebSocket();
    this.barChartWebSocket();
    this.scatterChartWebSocket();
  },
  methods: {
    lineChartWebSocket() {
      this.$socket.emit('line_chart_data', 'line chart connected!');
    },
    pieChartWebSocket() {
      this.$socket.emit('pie_chart_data', 'pie chart connected!');
    },
    barChartWebSocket() {
      this.$socket.emit('bar_chart_data', 'bar chart connected!');
    },
    scatterChartWebSocket() {
      this.$socket.emit('scatter_chart_data', 'scatter chart connected!');
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-area {
  margin-top: 1rem;
  margin-left: 1rem;
}

.content {
  background-color: #F4F3EF;
}
.margin-1 {
  margin: 1rem !important;
}

.green {
  color: green
}

.red {
  color: red
}
</style>
