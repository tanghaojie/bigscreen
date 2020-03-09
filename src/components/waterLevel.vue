<template>
  <div class="water-level flex flex-column">
    <div
      class="title"
      :style="data.titleH ? 'height:' + data.titleH + 'px;' : ''"
    >
      <p>{{ data.title || '' }}</p>
    </div>
    <dv-water-level-pond class="content" :config="data.config" />
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      required: true
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
.water-level {
  .title {
    font-size: 16px;
    vertical-align: middle;
    flex-grow: 0;
    flex-shrink: 0;

    p {
      margin: 0;
    }
  }
  .content {
    width: 100%;
    flex: 1;
  }
}
</style>
