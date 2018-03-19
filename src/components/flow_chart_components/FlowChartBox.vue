<template>
  <div class="flow-chart-box">
     <div class="save-box">
        <slot name="save-box"> </slot>
     </div>
     <div class="general-box">
       <slot name="general-box"></slot>
     </div>
     <!--<div class="exta-box"></div> -->
  </div>
</template>
<script>

export default {
  name: 'FlowChartBox',
};
</script>
<style scoped>

.flow-chart-box {
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(10, 7vh);
}

.flow-chart-box > div {
  border: 1px solid #C0C0C0;
  background-color: white;
  margin: 0.5rem;
}

.general-box {
  grid-column: 1;
  grid-row: 2 / -1 ;
}
.save-box {
  grid-column: 1;
  grid-row: 1  ;
}
.exta-box {
  grid-column: 1 ;
  grid-row: 8 / -1;
}


 @media (max-width: 700px) {

    .general-box {
        grid-column: 1;
        grid-row: 2 / 8 ;
    }
    
    .save-box {
        grid-column: 1;
        grid-row: 1 / 2  ;
    }
    
    .exta-box {
        grid-column: 1 ;
        grid-row: 8 / -1;
    }


 }
</style>
