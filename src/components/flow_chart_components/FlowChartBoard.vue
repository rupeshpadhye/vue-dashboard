<template>
  <div class="grid-container">
      <div class="flowchart-area">
        <slot name="flow-chart-area"></slot>
      </div>
      <div class="flowchart-box">
           <slot name="flow-chart-box"></slot>   
      </div>
  </div>
</template>
<script>

export default {
  name: 'FlowChartBoard',
};
</script>
<style scoped>

.grid-container {
  margin: 0 auto;
  padding: 1rem;
  max-height: 90vh;
}

.grid-container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(5, 20vmin);
}

.grid-container > div {
  border: 2px solid #BEBEBE;
  border-radius: 5px;
  background-color: #F5F5F5;
}

.flowchart-area { 
  grid-column: 1/ 11;
  grid-row: 1 / 5;
}
.flowchart-box {
  grid-column: 11/-1;
  grid-row: 1 / 5;
}

@media (max-width: 700px) {

    .grid-container {
      display: grid;
      grid-gap: 10px;
      grid-template-columns: repeat(1, 1fr);
      grid-template-rows: repeat(8, 20vmin);
    }

    .flowchart-area { 
      grid-column: 1;
      grid-row: 1 / 4;
    }

    .flowchart-box {
      grid-column: 1;
      grid-row: 4 / -1;
    }
}

</style>

