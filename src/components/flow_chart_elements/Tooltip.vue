<template>
  <div class="tooltip" :tool-tip-message="tooltipMessage">
     <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Tooltip',
  props: ['tooltip-message'],
};
</script>
<style scoped>

.tooltip{
    display: inline;
    position: relative;
}

.tooltip:hover:after{
    border: solid 1px #ddd;
    background: rgba(211,211,211,.3);
    border-radius: 5px;
    color: #101010;
    content: attr(tool-tip-message);
    padding: 5px 15px;
    position: absolute;
    z-index: 98;
    left: 10%;
    min-width: 90px;
    font-weight: bold;
}

</style>
