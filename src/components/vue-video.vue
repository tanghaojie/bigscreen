<template>
  <video ref="videoPlayer" class="video-js"></video>
</template>

<script>
import videojs from 'video.js'
import 'videojs-flash'
import SWF_PATH from 'videojs-swf/dist/video-js.swf'
import 'video.js/dist/video-js.min.css'

export default {
  components: {},
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      player: null
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    this.options.flash = {}
    this.options.flash.swf = SWF_PATH
    this.player = videojs(this.$refs.videoPlayer, this.options)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style></style>
