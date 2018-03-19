<template>
<svg  width="100%" height="100%">
  <rect :x="x" :y="y" :width="width" :height="height" v-bind:style="styles"  :transform="transformMatrix"  @dblclick="onMouseDown"  class="draggable"/>  
</svg> 
</template>
<script>
/* eslint-disable */
import EvenBus from '@/components/eventbus/event_bus';

export default {
  name: 'SvgRectangle',
  props: ['width', 'height', 'styles', 'x', 'y'],
  data() {
    return {
      readonly: false,
      doubleClicked: false,
      currentMatrix: 0,
      transformMatrix: "matrix(1 0 0 1 0 0)", 
      curTransformMatrix: 0,
      currentX: 0,
      currentY: 0,
    };
  },
  methods: {
    onDoubleClick() {
      console.log('double clicked', this.$el.id);
      EvenBus.$emit('DOUBLE_CLICKED_NODE_ID', this.$el.id);
    },
    onMouseMove(evt) {
      /* if (this.$el.id) {
        const updatedNode = {
          id: +this.$el.id,
          x: event.clientX,
          y: event.clientY,
        };
        this.$store.dispatch('UPDATE_NODE_XY', updatedNode);
      } else {
        this.$el.removeEventListener('mousemove', this.onMouseMove);
      } */
      let dx = evt.clientX - this.currentX;
      let dy = evt.clientY - this.currentY;
      this.currentMatrix[4] += dx;
      this.currentMatrix[5] += dy;
      this.transformMatrix = "matrix(" + this.currentMatrix.join(' ') + ")";
      this.currentX = evt.clientX;
      this.currentY = evt.clientY;
      if (this.$el.id) {
        const updatedNode = {
          id: +this.$el.id,
          transform:  this.transformMatrix,
        };
        this.$store.dispatch('UPDATE_NODE_XY', updatedNode);
      }
    },
    onMouseDown(event) {
      const selectedElement = this.$el;
      this.currentMatrix = this.transformMatrix.slice(7,-1).split(' ');
      for(var i=0; i < this.currentMatrix.length; i++) {
        this.currentMatrix[i] = parseFloat(this.currentMatrix[i]);
      }
      selectedElement.addEventListener('mousemove', this.onMouseMove);
      selectedElement.addEventListener('mouseout', this.onMouseOut);
      selectedElement.addEventListener('mouseup', this.onMouuseUp);
    },
    onMouseUp(event) {
      const selectedElement = this.$el;
      selectedElement.removeEventListener('mousemove', this.onMouseMove);
      selectedElement.removeEventListener('mouseout', this.onMouseOut);
      selectedElement.removeEventListener('mouseup', this.onMouuseUp);
    },
  },
};
</script>
<style scoped>
 .draggable {
   cursor: move;
 }
</style>
