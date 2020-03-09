<template>
  <div class="spin-view">
    <div class="spin-name">
      {{ data.title }}
    </div>
    <div class="wrapper">
      <div class="container">
        <dv-decoration-9 :dur="data.dur || 5">
          {{ data.text || '' }}
        </dv-decoration-9>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          title: 'title',
          dur: 5,
          text: '123'
        }
      }
    }
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.spin-view {
  width: 100%;
  height: 100%;

  .spin-name {
    font-size: 16px;
    text-align: center;
  }

  .wrapper {
    margin-top: 10px;
    width: 100%;
    padding-top: 100%;
    position: relative;

    .container {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
