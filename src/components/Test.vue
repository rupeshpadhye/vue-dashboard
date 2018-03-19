<script>
import EventBus from '@/components/eventbus/event_bus';

export default {
  name: 'Test',
  data: () => ({
    msg: [],
  }),
  methods: {
    hello() {
      alert('This is the message.');
    },
    redraw(evt) {
      this.msg.push(evt);
    },
  },
  mounted() {
    EventBus.$on('ADD_NEW_ITEM', (type) => {
      this.redraw(type.nodeinfo.type);
    });
  },
  render() {
    return (
      <span on-click={ this.hello }> { this.msg } </span>
    );
  },
};

</script>
<style scoped>
</style>
