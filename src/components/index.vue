<template>
  <div id="index">
    <div class="devFull">
      <!-- <dv-full-screen-container> -->
      <div class="flex flex-container">
        <top />
        <digital-flop />
        <div class="main-container">
          <transition name="fade" mode="out-in">
            <component v-bind:is="screenModeToComponent"></component>
          </transition>

          <div class="overlay flex flex-row justify-center flex-align-end">
            <transition name="fade">
              <div
                v-if="screenMode.none != nowScreenMode"
                class="overlay overlay-bg-img"
              ></div>
            </transition>

            <div
              v-for="item in getSwitches"
              class="padding-10 all-point-events"
              @click="setNowScreenMode(item.screenMode)"
              :key="item.screenMode"
            >
              <icon
                :name="item.iconName"
                scale="1.5"
                :style="{
                  color:
                    item.screenMode == nowScreenMode
                      ? screenModeIconColor.selected
                      : screenModeIconColor.default
                }"
              />
            </div>
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
import screenMonitor from './screen_monitor.vue'
import screenStatistic from './screen_statistic.vue'

export default {
  components: {
    top,
    webMap,
    digitalFlop,
    Icon,
    'screen-monitor': screenMonitor,
    'screen-statistic': screenStatistic
  },
  props: {},
  data() {
    return {
      screenMode: {
        statistic: 0,
        monitor: 1,
        none: 2
      },
      screenModeIconColor: {
        default: '#fff',
        selected: '#001c45'
      },
      nowScreenMode: undefined
    }
  },
  watch: {},
  computed: {
    screenModeToComponent() {
      if (this.nowScreenMode === this.screenMode.monitor) {
        return 'screen-monitor'
      } else if (this.nowScreenMode === this.screenMode.statistic) {
        return 'screen-statistic'
      }
      return null
    },
    getSwitches() {
      return [
        {
          screenMode: this.screenMode.statistic,
          iconName: 'chart-bar'
        },
        {
          screenMode: this.screenMode.monitor,
          iconName: 'eye'
        },
        {
          screenMode: this.screenMode.none,
          iconName: 'map'
        }
      ]
    }
  },
  methods: {
    setNowScreenMode(mode) {
      this.nowScreenMode = mode
    }
  },
  created() {
    this.nowScreenMode = this.screenMode.statistic
  },
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

      .overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .overlay-bg-img {
        background-image: url('../assets/imgs/bg_overlay4_container.png');
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
