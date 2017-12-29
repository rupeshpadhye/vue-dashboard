<template>
  <div id="app"  class="app-viewport">
   <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
.app-viewport {
     height:95vh;
     word-break: break-all;
}


</style>
