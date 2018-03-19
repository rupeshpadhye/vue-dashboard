<template>
<svg>
  <line :x1="xstart" :y1="ystart" :x2="xend" :y2="yend" :style="styles" />
</svg>
</template>
<script>
export default {
  name: 'SvgLine',
  props: ['xstart', 'ystart', 'xend', 'yend', 'styles'],
};
</script>
<style scoped>

</style>
