<template>
  <md-list class="custom-list">
    <md-list-item v-for="item in items">
      <div class="md-list-text-container">
        <span>{{item.title}}</span>
        <md-divider class="md-inset"></md-divider>
      </div>

    </md-list-item>
  </md-list>
</template>
<script>
/* eslint linebreak-style: ["off", "windows"] */
export default {
  name: 'List',
  data() {
    return {
      items: [
       { title: 'List item 1' },
       { title: 'List item 2' },
      ],
    };
  },
  methods: {},
};
</script>
