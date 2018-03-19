<template>
<div>
  
  <flow-chart-board>
        <flow-chart-area slot="flow-chart-area" flow-chart-mode="grid">
        </flow-chart-area>
        <flow-chart-box slot="flow-chart-box">
            <flow-chart-general-box slot="general-box"></flow-chart-general-box>
            <test></test>
        </flow-chart-box>
  </flow-chart-board>
</div>
</template>
<script>
import FlowChartBoard from '@/components/flow_chart_components/FlowChartBoard';
import FlowChartBox from '@/components/flow_chart_components/FlowChartBox';
import FlowChartArea from '@/components/flow_chart_components/FlowChartArea';
import FlowChartGeneralBox from '@/components/flow_chart_components/FlowChartGeneralBox';
import Test from '@/components/Test';

export default {
  name: 'FlowChartApp',
  components: { FlowChartBoard, FlowChartBox, FlowChartArea, FlowChartGeneralBox, Test },
};
</script>
<style>
audio:not(.md-image), img:not(.md-image), svg:not(.md-image), object:not(.md-image), embed:not(.md-image), canvas:not(.md-image), video:not(.md-image), iframe:not(.md-image) {
   height: -webkit-fill-available;
 }
</style>
