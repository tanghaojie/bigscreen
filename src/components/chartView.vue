<template>
  <div class="chart-view">
    <div class="chart-name" :class="data.leftOrRight || 'left'">
      {{ data.title }}
      <dv-decoration-3 style="width:200px;height:20px;" />
    </div>
    <dv-charts :option="data.option" />
  </div>
</template>

<script>
export default {
  components: {},
  props: ['data'],
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

<style lang="less">
.chart-view {
  position: relative;
  // padding: 0 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  .chart-name {
    position: absolute;
    font-size: 20px;
    top: 10px;
  }

  .left {
    left: 30px;
    text-align: left;
  }

  .right {
    right: 30px;
    text-align: right;
  }
}
</style>
