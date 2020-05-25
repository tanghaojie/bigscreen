<template>
  <div id="digital-flop">
    <div
      class="digital-flop-item"
      v-for="item in digitalFlopData"
      :key="item.title"
    >
      <div class="digital-flop-title">
        {{ item.title }}
      </div>
      <div class="flex">
        <dv-digital-flop :config="item.number" class="dv-digital-flop" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      digitalFlopData: []
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.digitalFlopData = [
      {
        title: '河长数量',
        number: {
          number: [10120],
          content: '{nt}',
          textAlign: 'center',
          style: {
            fill: '#40faee',
            fontWeight: 'bold'
          }
        }
      },
      {
        title: '河流数量',
        number: {
          number: [9999],
          content: '{nt}',
          textAlign: 'center',
          style: {
            fill: '#f46827',
            fontWeight: 'bold'
          }
        }
      },
      {
        title: '湖泊数量',
        number: {
          number: [999],
          content: '{nt}',
          textAlign: 'center',
          style: {
            fill: '#4d99fc',
            fontWeight: 'bold'
          }
        }
      },
      {
        title: '总巡河量',
        number: {
          number: [999],
          content: '{nt}',
          textAlign: 'center',
          style: {
            fill: '#6f439a',
            fontWeight: 'bold'
          }
        }
      }
    ]
  }
}
</script>

<style lang="less" scoped>
#digital-flop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 77px;
  position: absolute;
  top: 18px;
  right: 0px;

  .digital-flop-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .digital-flop-title {
    font-size: 18px;
  }

  .dv-digital-flop {
    width: 150px;
    height: 50px;
  }
}
</style>
