<template>
  <md-list class="custom-list md-triple-line">

    <md-list-item v-for="item in items">
      <md-avatar>
        <img src="https://placeimg.com/40/40/people/1" alt="People">
      </md-avatar>

      <div class="md-list-text-container">
        <span>Ali Connors</span>
        <span>Brunch this weekend?</span>
        <p>I'll be in your neighborhood doing errands...</p>
      </div>
      <md-divider class="md-inset"></md-divider>
    </md-list-item>
  </md-list>
</template>
<script>
/* eslint linebreak-style: ["off", "windows"] */
export default {
  name: 'ThreeLineList',
  data() {
    return {
      items: [
       { message: 'Foo' },
       { message: 'Bar' },
      ],
    };
  },
  methods: {},
};
</script>
