<template>
  <div id="index">
    <div class="devFull">
      <!-- <dv-full-screen-container> -->
      <div class="flex flex-container">
        <top />
        <digital-flop />
        <div class="main-container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>

          <div
            class="overlay none-point-events z-index-1 flex flex-row justify-center flex-align-end"
          >
            <transition name="fade">
              <router-view name="overlay"></router-view>
            </transition>

            <router-link
              v-for="item in getSwitches"
              class="padding-10 all-point-events"
              :key="item.screenMode"
              :to="item.to"
              active-class="active"
              exact
              style="color:#fff;"
            >
              <icon :name="item.iconName" scale="1.5" />
            </router-link>
          </div>

          <div class="map-container">
            <web-map class="mapview" />
          </div>
        </div>
      </div>
      <!-- </dv-full-screen-container> -->
    </div>
  </div>
</template>

<script>
import top from './top.vue'
import webMap from './webMap.vue'
import digitalFlop from './digitalFlop.vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
  components: {
    top,
    webMap,
    digitalFlop,
    Icon
  },
  props: {},
  data() {
    return {}
  },
  watch: {},
  computed: {
    getSwitches() {
      return [
        // {
        //   iconName: 'eye',
        //   to: '/statistic'
        // },
        {
          iconName: 'chart-bar',
          to: '/monitor'
        },
        {
          iconName: 'map',
          to: '/'
        }
      ]
    }
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
#index {
  width: 100%;
  height: 100%;
  color: #fff;

  .flex-container {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .main-container {
      flex: 1;
      width: 100%;
      position: relative;
      background-image: url('../assets/imgs/bg_container.png');

      .active {
        color: #001c45 !important;
      }

      .map-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .mapview {
          width: 100%;
          height: 100%;
        }
      }

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.25s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .fade-enter-to,
      .fade-leave {
        opacity: 1;
      }
    }
  }

  .devFull {
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
  }
  #dv-full-screen-container {
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
  }
}
</style>
