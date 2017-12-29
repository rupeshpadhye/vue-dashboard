<template>
<div>
<md-layout  class="chart-area">
        <md-layout :md-gutter="8">
            <md-card md-with-hover>
              <md-card-header>
                <div class="md-title">Line Chart</div>
                 <div class="md-subhead">
                <span v-if="isLineChartConnected" class="green">connected </span>
                <span v-else class="red">Service unavailble</span>
                 </div>
              </md-card-header>
              <md-card-content>
                   <line-chart  :data="lineChartData"  :options="{responsive: true, maintainAspectRatio: true}" :labels="lineChartLabels" :display-name="lineChartDisplayName"></line-chart>
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
                <pie-chart :data="pieChartData"  :options="{responsive: true, maintainAspectRatio: false}" :labels="pieChartLabels"
                :background-colors="['#41B883', '#E46651', '#00D8FF', '#DD1B16']"
                ></pie-chart>
             </md-card-content>
          </md-card>
      </md-layout>
      <md-layout>
          <md-card md-with-hover>
            <md-card-header>
              <div class="md-title">Line Chart</div>
              <div class="md-subhead">random data</div>
            </md-card-header>
            <md-card-content>
               <line-chart :chart-data="lineChartData"  :options="{responsive: true, maintainAspectRatio: true}"></line-chart>
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
                <bar-chart :data="barChartData"  :options="{responsive: true, maintainAspectRatio: true}" :labels="barChartLabels" :display-name="barChartDisplayName"
                 background-colors="#FF3F33"
                ></bar-chart>
             </md-card-content>
          </md-card>

    </md-layout>
 </md-layout>
 <md-layout>
     <md-layout class="full-width">
         <md-card class="margin-1">
           <md-card-header>
             <div class="md-title">Tabular Data</div>
           </md-card-header>
           <md-card-content>
            <table-view></table-view>
           </md-card-content>
        </md-card>
      </md-layout>
      <md-layout>
        <md-card class="full-width margin-1">
            <three-line-list></three-line-list>
        </md-card>
     </md-layout>
     <md-layout>
       <md-card class="full-width margin-1">
        <list></list>
       </md-card>
     </md-layout>
</md-layout>

</md-layout>

</div>
</template>
<script>
/* eslint linebreak-style: ["off", "windows"] */
import lineChart from '@/components/charts/lineChart';
import barChart from '@/components/charts/barChart';
import scatterChart from '@/components/charts/scatterChart';
import pieChart from '@/components/charts/pieChart';
import list from '@/components/List';
import ThreeLineList from '@/components/ThreeLineList';
import TableView from '@/components/TableView';

export default {
  name: 'HomeDashboard',
  components: { lineChart, barChart, scatterChart, pieChart, list, ThreeLineList, TableView },
  data() {
    return {
      lineChartData: [],
      pieChartData: [],
      barChartData: null,
      scatterChartData: null,
      isLineChartConnected: false,
      isPieChartConnected: false,
      isBarChartConnected: false,
      lineChartLabel: '',
      lineChartDisplayName: '',
      pieChartLabels: [],
      barChartLabels: [],
      barChartDisplayName: '',
    };
  },
  sockets: {
    connect() {
      this.isLineChartConnected = true;
      this.isPieChartConnected = true;
      this.isBarChartConnected = true;
    },
    disconnect() {
      this.isLineChartConnected = false;
      this.isPieChartConnected = false;
      this.isBarChartConnected = false;
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
      console.log(data);
    },
  },
  created() {
    this.scatterChartData = this.fillScatterData();
  },
  mounted() {
    this.lineChartWebSocket();
    this.pieChartWebSocket();
    this.barChartWebSocket();
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
  },
};
</script>
<style lang="scss" scoped>
    .chart-area {
      margin-top: 2rem;
      margin-left: 1rem;
    }

    .full-width {
      width:100%;
    }

    .margin-1{
      margin: 1rem !important;
    }
    .green {
      color:green
    }
     .red {
      color:red
    }
</style>
