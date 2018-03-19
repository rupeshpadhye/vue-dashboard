<template>
  <svg>
  <circle :cx="width/2" :cy="height/2" :r="radius"  :style="styles" />
</svg> 
</template>
<script>
export default {
  name: 'SvgCircle',
  props: ['width', 'height', 'styles', 'radius'],
};
</script>
<style scoped>

</style>
