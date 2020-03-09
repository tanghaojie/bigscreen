<template>
  <div class="capsule-chart-view flex flex-column">
    <div
      class="chart-name flex flex-column flex-align-end"
      :class="data.leftOrRight || 'left'"
    >
      {{ data.title }}
      <dv-decoration-6 style="width:200px;height:20px;" />
    </div>
    <dv-capsule-chart :config="data.config" style="flex:1" />
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
.capsule-chart-view {
  box-sizing: border-box;
  height: 100%;
  width: 100%;

  .chart-name {
    font-size: 20px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .left {
    align-items: flex-start;
    margin-left: 30px;
  }

  .right {
    align-items: flex-end;
    margin-right: 30px;
  }
}
</style>
