<template>
  <md-list class="custom-list">
    <md-list-item v-for="(item,index) in items" :key="index">
      <div class="md-list-text-container">
        <span style="color:green">{{item.step}}</span>
        <md-divider class="md-inset"></md-divider>
        <span>{{item.desc}}</span>
        <ul v-for="(hookItem,index) in item.hooks" :key="index">
          <li>{{hookItem}}</li>
        </ul>
      </div>
    </md-list-item>
  </md-list>
</template>
<script>
export default {
  name: 'VueLifeCycle',
  data() {
    return {
      items: [],
      property: 'Blank',
    };
  },
  computed: {
    propertyComputed() {
      console.log('I change when this.property changes.');
      return this.property;
    },
  },
  beforeCreate() {
    console.log('Nothing gets called before me!');
  },
  created() {
    this.property = 'Example property update.';
    console.log('propertyComputed will update, as this.property is now reactive.');
    this.items = [
      {
        step: 'Creational',
        desc: 'Use creation hooks if you need to set things up in your component both during client rendering and server rendering. You will not have access to the DOM ',
        hooks: [
          'beforeCreate :at the very initialization of your component. data has not been made reactive, and events have not been set up yet',
          'created : you will be able to access reactive data and events are active. Templates and Virtual DOM have not yet been mounted or rendered.',

        ],
      },
      {
        step: 'Mounting',
        desc: 'They allow you to access your component immediately before and after the first render. They do not, however, run during server-side rendering.',
        hooks: [

          'beforeMount: The beforeMount hook runs right before the initial render happens and after the template or render functions have been compiled. not called on sever side rendering',
          'mounted : full access to the reactive component, templates, and rendered DOM',

        ],
      },
      {
        step: 'Update',
        desc: 'Updating hooks are called whenever a reactive property used by your component changes, or something else causes it to re-render. They allow you to hook into the watch-compute-render cycle for your component.',
        hooks: [

          'beforeUpdate: The beforeMount hook runs right before the initial render happens and after the template or render functions have been compiled. not called on sever side rendering',
          'updated :full access to the reactive component, templates, and rendered DOM',

        ],
      },
      {
        step: 'Destoy',
        desc: 'when your component is destroyed, such as cleanup or analytics sending. They fire when your component is being torn down and removed from the DOM',
        hooks: [

          'beforeDestroy:is fired right before teardown. Your component will still be fully present and functional. If you need to cleanup events or reactive subscription',
          'destroyed: Everything that was attached to it has been destroyed. last-minute cleanup or inform a remote server ',

        ],
      },
    ];
  },
  beforeMount() {
    console.log('this.$el doesn exist yet, but it will soon!');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforUpdate', this.property);
  },
  updated() {
    console.log('updated', this.property);
  },
  beforeDestroy() {
    console.log('before destroy');
  },
  destroyed() {
    console.log('destroyed');
  },
  methods: {},
};
</script>