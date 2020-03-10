<template>
  <div id="top-header" class="flex">
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <!-- <dv-decoration-8 class="header-right-decoration" :reverse="true" /> -->
    <div class="header-right-decoration" :reverse="true" />
    <div class="center-title">XXX大屏展示平台</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
#top-header {
  width: 100%;
  height: 100px;
  justify-content: space-between;
  flex-shrink: 0; /**不能缩放*/
  flex-grow: 0; /**不能缩放*/
  background-image: url('../assets/imgs/bg_top.png');

  .header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 30px;
  }

  .header-left-decoration,
  .header-right-decoration {
    width: 25%;
    height: 60px;
  }

  .center-title {
    position: absolute;
    font-size: 30px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
  }
}
</style>
