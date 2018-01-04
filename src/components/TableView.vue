<template>
  <md-table>
       <md-table-header>
        <md-table-row>
          <md-table-head v-for="(header, pos) in headers" :key="pos">{{header}}</md-table-head>
        </md-table-row>
       </md-table-header>

       <md-table-body>
        <md-table-row v-for="(row, index) in tableData" :md-item="row" :key="index">
          <md-table-cell>{{row.name}}</md-table-cell>
          <md-table-cell v-for="(col, ind) in row.columns" :key="ind" md-numeric>{{col}}</md-table-cell>
        </md-table-row>
       </md-table-body>
</md-table>
</template>
<script>
/* eslint linebreak-style: ["off", "windows"] */
export default {
  name: 'TableView',
  props: ['headers', 'table-data'],
  data() {
    return {
      headers: [],
      tableData: [],
    };
  },
  methods: {},
};
</script>
