<template>
  <fullscreen ref="fullscreen" class="h-100" :fullscreen.sync="fullscreen">
    <div class="position-relative h-100" @mousemove="mousemove">
      <div :id="id" class="card-video"></div>
      <div
        class="optolls"
        v-show="toolsvisible"
        @mouseover="mouseoverTools"
        @mouseleave="mouseleaveTools"
      >
        <div class="btns-c1">
          <div
            class="btn-c1 btn-top"
            @mousedown="opstart(0)"
            @mouseup="opstop(0)"
            style=""
          ></div>
          <div
            class="btn-c1 btn-right"
            @mousedown="opstart(3)"
            @mouseup="opstop(3)"
          ></div>
          <div
            class="btn-c1 btn-left"
            @mousedown="opstart(2)"
            @mouseup="opstop(2)"
          ></div>
          <div
            class="btn-c1 btn-bottom"
            @mousedown="opstart(1)"
            @mouseup="opstop(1)"
          ></div>
        </div>
        <div class="btns-c2">
          <div
            class="btn-c2 btn-zoomin"
            @mousedown="opstart(8)"
            @mouseup="opstop(8)"
          ></div>
          <div
            class="btn-c2 btn-zoomout"
            @mousedown="opstart(9)"
            @mouseup="opstop(9)"
          ></div>
        </div>
      </div>
      <div class="screentools" v-show="toolsvisible">
        <div class="btn-fullscreen" @click="toggleFullScreen">
          <v-icon
            :name="fullscreen ? 'compress' : 'expand'"
            :scale="fullscreen ? 2 : 1"
          ></v-icon>
        </div>
      </div>
    </div>
  </fullscreen>
</template>

<script>
import fullscreen from 'vue-fullscreen'
import Vue from 'vue'
import 'vue-awesome/icons/compress'
import 'vue-awesome/icons/expand'
import Icon from 'vue-awesome/components/Icon.vue'
import axios from 'axios'
import Qs from 'qs'
import { forEach, debounce } from 'lodash'
import { parseQuery } from '../assets/url.js'

Vue.use(fullscreen)
Vue.component('v-icon', Icon)
var config = {
  responseType: 'application/json'
}
export default {
  name: 'card-video',
  props: ['content'],
  data: function() {
    return {
      id:
        'video' +
        Math.random()
          .toString()
          .substr(2, 10),
      list: [],
      geometry: null,
      i: 0,
      toolsvisible: false,
      fullscreen: false,
      isvisible: false
    }
  },
  methods: {
    toggleFullScreen() {
      this.$refs['fullscreen'].toggle() // recommended
      // this.fullscreen = !this.fullscreen // deprecated
    },
    mousemove() {
      this.setToolsVisible(true)
      this.debouncedSetToolsVisible(false)
    },
    mouseoverTools() {
      this.isvisible = true
    },
    mouseleaveTools() {
      this.isvisible = false
    },
    setToolsVisible(v) {
      this.toolsvisible = v || this.isvisible
    },
    getData() {
      axios
        .post(this.content.url, { pagesize: 10, pagenum: 1 }, config)
        .then(({ data }) => {
          if (data.status === 0 && data.data.length > 0) {
            this.list = []
            forEach(data.data, item => {
              this.list.push({
                name: item.name,
                address: item.address,
                geometry: item.geometry ? JSON.parse(item.geometry) : null,
                url: item.preview,
                code: item.code
              })
            })
            if (this.i > this.list.length - 2) {
              this.i = this.list.length - 2
            }
            this.setPlayer()
          }
        })
    },
    getToken() {
      if (this.$parent.hik_accessToken) {
        this.accessToken = this.$parent.hik_accessToken
        return
      }
      if (this.content.qdata && this.content.qdata.other) {
        var url = this.content.qdata.other.hikgettokenurl
        axios.get(url).then(({ data }) => {
          if (data.status === 0) {
            this.accessToken = data.data.accessToken
            this.$parent.hik_accessToken = this.accessToken
          }
        })
      }
    },
    opstart(op) {
      this.handCamera('start', op)
    },
    opstop(op) {
      this.handCamera('stop', op)
    },
    handCamera(type, op) {
      var data = {
        accessToken: this.accessToken,
        deviceSerial: this.deviceSerial,
        channelNo: this.channelNo,
        direction: op,
        speed: 0
      }

      axios
        .post(
          'https://open.ys7.com/api/lapp/device/ptz/' + type,
          Qs.stringify(data),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        )
        .then(({ data }) => {})
    },
    setPlayer() {
      var item = this.list[this.i]
      this.geometry = item.geometry
      this.deviceSerial = item.code.split('_')[0]
      this.channelNo = item.code.split('_')[1]

      // var videoObject = {
      //   container: '#' + this.id,
      //   variable: 'player', // 播放函数名称,
      //   autoplay: true,
      //   live: true,
      //   video: item.url
      // }
      // this.player = new ckplayer(videoObject)
      if (this.$parent.setHeadTitle) {
        this.$parent.setHeadTitle(item.name)
      }
    },
    start() {
      if (this.player) {
        this.player.playOrPause()
      }
    },
    stop() {
      if (this.player) {
        this.player.stop()
      }
    },
    resize() {},
    clickTool(t) {
      this.i++
      if (this.i === this.list.length) {
        this.i = 0
      }
      this.setPlayer()
    }
  },
  created() {
    // this.id = "video" + Math.random().toString().substr(2, 10);

    this.debouncedSetToolsVisible = debounce(this.setToolsVisible, 3000)
  },
  mounted() {
    if (this.content.url) {
      var index = parseQuery(this.content.url).kpvindex
      if (index) {
        this.i = index
      }
      this.getData()
    }
    if (this.content.data) {
      this.list = this.content.data
      this.setPlayer()
    }
    this.getToken()
  },
  beforeDestroy() {
    // this.stop();
  },
  destroyed() {}
}
</script>

<style scoped>
.card-video {
  height: 100%;
  width: 100%;
}
.fullscreen .optolls {
  font-size: 32px;
}
.optolls {
  font-size: 16px;
  width: 4em;
  height: 4em;
  background-color: #808080;
  position: absolute;
  top: 1em;
  right: 1em;
  opacity: 0.5;
  border-radius: 2em;
  background-image: url('../assets/imgs/ysy_control_b.png');
  background-size: contain;
}

.optolls:hover {
  opacity: 1;
}

.btns-c1 {
  position: absolute;
  transform: rotate(45deg);
  border-radius: 2em;
  width: 4em;
  height: 4em;
}

.btns-c2 {
  position: absolute;
  background-color: #808080;
  top: 1em;
  left: 1em;
  border-radius: 1em;
  background-image: url('../assets/imgs/ysy_control_c.png');
  background-size: cover;
}

.btn-c1 {
  float: left;
  width: 2em;
  height: 2em;
}

.btn-c1:hover,
.btn-c2:hover {
  background-color: #00ffff;
  opacity: 0.5;
  cursor: pointer;
}

.btn-top {
  border-radius: 2em 0 0 0;
}

.btn-right {
  border-radius: 0 2em 0 0;
}

.btn-left {
  border-radius: 0 0 0 2em;
}

.btn-bottom {
  border-radius: 0 0 2em 0;
}

.btn-c2 {
  width: 2em;
  height: 1em;
}

.btn-zoomin {
  border-radius: 1em 1em 0 0;
}

.btn-zoomout {
  border-radius: 0 0 1em 1em;
}
.screentools {
  position: absolute;
  bottom: 0.5em;
  right: 0.5em;
}
.btn-fullscreen {
  cursor: pointer;
  opacity: 0.5;
}
.btn-fullscreen:hover {
  opacity: 1;
}
</style>
