<template>
  <div>
    <div id="mapView"></div>
  </div>
</template>

<script>
import { JS_API_URL } from '../config/config.js'
import { loadModules } from 'esri-loader'
import { mapState } from 'vuex'
// import func from '../../vue-temp/vue-editor-bridge'

export default {
  name: 'web-map',
  methods: {
    initMap(Map, esriConfig, WMSLayer, FeatureLayer, MapImageLayer, Basemap) {
      // esriConfig.request.corsEnabledServers.push('192.168.0.122:6080')
      // var layer = new WMSLayer({
      //   url:
      //     'http://192.168.0.122:6080/arcgis/services/hehu/MapServer/WMSServer',
      //   sublayers: [
      //     {
      //       name: '2'
      //     }
      //   ]
      // })
      // const layer = new FeatureLayer({
      //   url:
      //     'http://192.168.0.122:6080/arcgis/rest/services/hehu/MapServer'
      // })
      const layer = new MapImageLayer({
        url: 'http://192.168.0.122:6080/arcgis/rest/services/hehu/MapServer'
      })

      const baseMap = Basemap.fromId('streets-night-vector')
      baseMap.baseLayers.add(layer)
      return new Map({
        basemap: baseMap,
        ground: 'world-elevation'
      })
    },
    initSceneView(SceneView, containerIdSelector, map) {
      return new SceneView({
        container: containerIdSelector,
        map: map,
        // camera: this.camera,
        alphaCompositingEnabled: true,
        environment: {
          background: {
            type: 'color',
            color: [0, 0, 0, 0]
          },
          starsEnabled: false,
          atmosphereEnabled: false
        }
      })
    },
    initWebGLDetect(view, containerIdSelector) {
      view
        .when(function() {
          document.getElementById(containerIdSelector).style.display = 'flex'
        })
        .catch(function(error) {
          if (error.name.includes('webgl')) {
            document.getElementById(containerIdSelector).style.display = 'none'
            alert('WebGL未启用，无法显示三维地球！')
          }
        })
    },
    initViewUIComponents(view) {
      view.ui.components = []
    },
    initWatchUtils(watchUtils, view, camera) {
      watchUtils.whenOnce(view, 'ready').then(function(result) {
        view.goTo(camera, { maxDuration: 1000 })
      })
      // this.view.on('click', function(evt) {})
    },
    initWebMap() {
      const options = {
        css: true,
        url: JS_API_URL
      }
      loadModules(
        [
          'esri/Map',
          'esri/Basemap',
          'esri/views/SceneView',
          'esri/core/watchUtils',
          'esri/layers/WMSLayer',
          'esri/layers/FeatureLayer',
          'esri/layers/MapImageLayer',
          'esri/config',
          'esri/layers/GraphicsLayer',
          'esri/Graphic'
        ],
        options
      ).then(
        ([
          Map,
          Basemap,
          SceneView,
          watchUtils,
          WMSLayer,
          FeatureLayer,
          MapImageLayer,
          esriConfig,
          GraphicsLayer,
          Graphic
        ]) => {
          let self = this
          let containerIdSeletor = 'mapView'

          const map = this.initMap(
            Map,
            esriConfig,
            WMSLayer,
            FeatureLayer,
            MapImageLayer,
            Basemap
          )

          self.view = this.initSceneView(SceneView, containerIdSeletor, map)
          this.initWebGLDetect(self.view)
          this.initViewUIComponents(self.view)
          this.initWatchUtils(watchUtils, self.view, self.camera)

          // var point = {
          //   type: 'point',
          //   x: -0.178,
          //   y: 51.48791
          //   // z: 1000
          // }

          // var point2 = {
          //   type: 'point',
          //   x: -0.178,
          //   y: 51.49
          //   // z: 1000
          // }

          // var markerSymbol = {
          //   type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          //   color: [226, 119, 40],
          //   outline: {
          //     // autocasts as new SimpleLineSymbol()
          //     color: [255, 255, 255],
          //     width: 2
          //   }
          // }

          // var pointGraphic = new Graphic({
          //   geometry: point,
          //   symbol: markerSymbol
          // })

          // var pointGraphic2 = new Graphic({
          //   geometry: point2,
          //   symbol: markerSymbol
          // })

          // self.view.graphics.add(pointGraphic)
          // self.view.graphics.add(pointGraphic2)
          // this.showProperties()
        }
      )
    },
    showProperties() {
      const properties = [
        // 'navigation',
        // 'focused'
        // 'interacting',
        // 'updating',
        // 'ready',
        // 'resolution',
        // 'scale',
        // 'camera'
        // 'zoom',
        // 'stationary'
        // the following properties are commented out for space reason, comment in if you would like to see them
        // "resizing", "height", "width", "size"
        // "allLayerViews", "animation", "container", "spatialReference", "type",
        // "declaredClass", "graphics", "groundView",  "input",
        // "layerViews", "map", "navigation", "padding", "popup",
        // "suspended",  "ui"
      ]
      function setupPropertiesListener(view, name) {
        view.watch(name, function(value) {
          console.log(value)
        })
      }
      for (let i = 0; i < properties.length; i++) {
        setupPropertiesListener(this.view, properties[i])
      }
    },
    xxx(Graphic) {
      var point = {
        type: 'point',
        x: -0.178,
        y: 51.48791
        // z: 1000
      }

      var markerSymbol = {
        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
        outline: {
          // autocasts as new SimpleLineSymbol()
          color: [255, 255, 255],
          width: 2
        }
      }

      var pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol
      })

      self.view.graphics.add(pointGraphic)
      // this.graphicsLayer.add(pointGraphic)
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      camera: 'camera',
      graphics: state => state.graphics
    })
  },
  watch: {
    camera(current) {
      this.view.goTo(current, { maxDuration: 1000 })
    },
    graphics(current) {
      this.view.graphics.removeAll()
      if (current) {
        const options = {
          css: false,
          url: JS_API_URL
        }
        loadModules(['esri/Graphic'], options).then(([Graphic]) => {
          let self = this
          current.forEach(element => {
            self.view.graphics.add(
              new Graphic({
                geometry: element.geometry,
                symbol: element.symbol
              })
            )
          })
        })
      }
    }
  },
  mounted() {
    this.initWebMap()
  },
  beforeDestroy() {
    if (this.view) {
      this.view.container = null
    }
  }
}
</script>

<style scoped>
#mapView {
  width: 100%;
  height: 100%;
}
</style>
