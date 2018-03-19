
<!--<template>
  <div class="flow-chart-area">
      <component :is="FlowChartMode">
         <slot></slot>
      </component>
</div>
</template> -->
<script>
/* eslint no-unused-vars: "off" */
import _ from 'lodash';
import SvgRectangle from '@/components/flow_chart_elements/SvgRectangle';
import Grid from '@/components/flow_chart_components/Grid';
import { mapGetters } from 'vuex';
/* eslint-disable */
export default {
  name: 'FlowChartArea',
  components: { Grid },
  props: ['Flow-chart-mode'],
  computed: {
    nodes() {
      return this.$store.getters.getNodes;
    },
  },
  render() {
    const flowChart = this.nodes.map((node) => {
      const props = _.cloneDeep(node.nodeinfo);
      const component = <node.component {...props} id={node.id}/>;
      return component;
    });
    console.log(flowChart);
    return (
       <div class="flow-chart-area">
          <Grid>{ flowChart}
          </Grid>
       </div>
    );
  },
};
</script>
<style scoped>
 .flow-chart-area {
   width: 100%;
   height: 100%;
 }

</style>
