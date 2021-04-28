<template>
  <div>
    <button id="canoe" class="esri-button">Tent</button>
    <div id="mapView"></div>
  </div>
</template>

<script>
import { JS_API_URL } from '../config/config.js'
import esriLoader from 'esri-loader'
import { mapState, mapActions } from 'vuex'
import X from '../assets/ruler.img'

export default {
  name: 'web-map',
  methods: {
    createWatchUtils(view, camera) {
      this.esriModules.watchUtils
        .whenOnce(view, 'ready')
        .then(function(result) {
          view.goTo(camera, { maxDuration: 1000 })
        })
    },
    webGLDetect(view, containerIdSelector) {
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
    createMap() {
      this.esriModules.esriConfig.request.corsEnabledServers.push(
        'http://192.168.0.3:88'
      )
      // const layer = new this.esriModules.MapImageLayer({
      //   url:
      //     'https://sctz.arcgis.cn/arcgis/rest/services/hehu_guanghan/MapServer'
      // })
      const baseMap = this.esriModules.Basemap.fromId('hybrid')
      // const baseMap = Basemap.fromId('streets-night-vector')
      // baseMap.baseLayers.add(layer)
      return new this.esriModules.Map({
        basemap: baseMap,
        ground: 'world-elevation'
      })
    },
    createSceneView(containerIdSeletor, map) {
      return new this.esriModules.SceneView({
        container: containerIdSeletor,
        map: map
        // camera: this.camera,
        // alphaCompositingEnabled: true,
        // environment: {
        //   background: {
        //     type: 'color',
        //     color: [0, 0, 0, 0]
        //   },
        //   starsEnabled: false,
        //   atmosphereEnabled: false
        // }
      })
    },

    modelTest(view) {
      let self = this
      const graphicsLayer = new this.esriModules.GraphicsLayer({
        elevationInfo: { mode: 'on-the-ground' }
      })
      view.map.add(graphicsLayer)

      const canoeBtn = document.getElementById('canoe')

      view
        .when(function() {
          canoeBtn.addEventListener('click', function() {
            self.view.graphics.add(
              new self.esriModules.Graphic({
                geometry: {
                  type: 'point',
                  x: 113.030446,
                  y: 23.037887
                },
                symbol: {
                  type: 'point-3d',
                  symbolLayers: [
                    {
                      type: 'object',
                      resource: {
                        href: X
                      },
                      width: 1,
                      height: 50,
                      depth: 10,
                      heading: 90
                    }
                  ]
                }
              })
            )
          })
        })
        .catch(console.error)
    },

    create() {
      let containerIdSeletor = 'mapView'
      let view = this.createSceneView(containerIdSeletor, this.createMap())
      this.webGLDetect(view, containerIdSeletor)
      view.ui.components = []
      this.createWatchUtils(view, this.camera)
      this.modelTest(view)
      this.showProperties()
      this.view = view
    },

    init() {
      esriLoader
        .loadModules(
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
            'esri/Graphic',
            'esri/geometry/Point',
            'esri/geometry/Mesh',
            'esri/widgets/Sketch/SketchViewModel',
            'esri/WebScene'
          ],
          {
            css: true,
            url: JS_API_URL
          }
        )
        .then(
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
            Graphic,
            Point,
            Mesh,
            SketchViewModel,
            WebScene
          ]) => {
            this.esriModules = {
              Map,
              Basemap,
              SceneView,
              watchUtils,
              WMSLayer,
              FeatureLayer,
              MapImageLayer,
              esriConfig,
              GraphicsLayer,
              Graphic,
              Point,
              Mesh,
              SketchViewModel,
              WebScene
            }
            this.create()
          }
        )
        .catch(er => {
          console.log('init error')
          console.log(er)
        })
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
          console.log(
            'position: ' +
              value.position.latitude +
              ' ' +
              value.position.longitude +
              ' ' +
              value.position.z
          )
          console.log('heading: ' + value.heading)
          console.log('tilt: ' + value.tilt)
        })
      }
      for (let i = 0; i < properties.length; i++) {
        setupPropertiesListener(this.view, properties[i])
      }
    },
    ...mapActions({
      setCamera: 'setCamera',
      setGraphics: 'setGraphics'
    })
  },
  data() {
    return {
      esriModules: {}
    }
  },
  computed: {
    ...mapState({
      camera: 'camera',
      graphics: state => state.graphics
    })
  },
  watch: {
    camera(current) {
      if (current) {
        this.view.goTo(current, { maxDuration: 1000 })
      }
    },
    graphics(current) {
      this.view.graphics.removeAll()
      if (current) {
        const options = {
          css: false,
          url: JS_API_URL
        }
        esriLoader.loadModules(['esri/Graphic'], options).then(([Graphic]) => {
          let self = this
          current.forEach(element => {
            self.view.graphics.add(
              new self.esriModules.Graphic({
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
    this.init()
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
