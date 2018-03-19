<template>
  <div id="general-box">
    <div @click="onClick('process')">
      <tooltip tooltip-message="Process">
        <svg-rectangle :width="40" :height="30" x="12" y="16"  styles='stroke: gray;stroke-width: 1;fill:whitesmoke;' :readonly="true"></svg-rectangle>
      </tooltip>
    </div>
      <div>
       <tooltip tooltip-message="Flowline">
         <svg-line xstart="10" ystart="10" xend="50" yend="50" styles="stroke:gray;stroke-width:2"></svg-line>
       </tooltip>
    </div>
    <div>
      <tooltip tooltip-message="On-page Connector">
        <svg-circle :width="64" :height="64" radius="16" styles='stroke: gray;stroke-width: 1;fill:whitesmoke;'> </svg-circle>
      </tooltip>
    </div>
  
    <div>
       <tooltip tooltip-message="Decision">
          <svg-rhombus styles="stroke:gray;stroke-width:2"></svg-rhombus>
       </tooltip>
    </div>

  </div>
</template>
<script>
import SvgRectangle from '@/components/flow_chart_elements/SvgRectangle';
import SvgCircle from '@/components/flow_chart_elements/SvgCircle';
import SvgLine from '@/components/flow_chart_elements/SvgLine';
import SvgRhombus from '@/components/flow_chart_elements/SvgRhombus';
import Tooltip from '@/components/flow_chart_elements/Tooltip';

export default {
  name: 'FlowChartGeneralBox',
  components: { SvgRectangle, SvgCircle, SvgLine, SvgRhombus, Tooltip },
  methods: {
    onClick(type) {
      this.$store.dispatch('ADD_NODE', this.getSvgComponent(type));
    },
    getSvgComponent(type) {
      let svgComponent;
      if (type === 'process') {
        svgComponent = {
          type: 'process',
          component: SvgRectangle,
          nodeinfo: {
            attrs: {
              x: 10,
              y: 10,
              width: 200,
              height: 50,
              styles: {
                stroke: 'gray',
                'stroke-width': 1,
                fill: 'white',
              },
            },
            domProps: {},
            listeners: {},
          },
        };
      }
      return svgComponent;
    },
  },
};
</script>
<style scoped>
#general-box {
  display: -webkit-flex;
  /* Safari */
  display: flex;
  -webkit-flex-wrap: wrap;
  /* Safari 6.1+ */
  flex-wrap: wrap;
  overflow: auto;
  background: #F8F8F8;
}

#general-box>div {
  width: 64px;
  height: 64px;
  box-sizing: border-box;
  background: #FFFFFF;
  border: 1px dotted #C0C0C0;
  margin: 0.2rem;
  cursor: pointer;
}

@media screen and (min-device-width: 1200px) and (max-device-width: 1600px) and (-webkit-min-device-pixel-ratio: 1) {

  #general-box>div {
    width: 80px;
    height: 80px;
    margin: 0.3rem;
  }
}
</style>
