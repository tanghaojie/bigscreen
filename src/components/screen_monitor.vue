<template>
  <div class="content flex none-point-events">
    <div
      class="content-item-left flex all-point-events flex-column justify-space-between"
    >
      <div style="height:32%;">
        <dv-border-box-1>
          <div style="font-size:18px;">实时水位监测</div>
          <div
            class="flex flex-row justify-space-around margin-t-10"
            style="height:calc(100% - 28px)"
          >
            <water-level
              v-for="item in waterLevels"
              :key="item.id"
              :data="item.data"
              style="height:80%"
              :style="'width:' + 80 / waterLevels.length + '%'"
              @click.native="waterLevelsClicked(item)"
            />
          </div>
        </dv-border-box-1>
      </div>
      <div style="height:32%;">
        <capsule-chart-view :data="onTimeWaterSpeed" />
      </div>
      <div style="height:32%;">
        <dv-border-box-8 :dur="6">
          <div style="font-size:18px;">水质监测和系统评级</div>
          <div class="flex flex-row justify-space-around initial-svg-w-h">
            <spin-view
              v-for="item in onTimeWaterQuality"
              :key="item.id"
              :data="item.data"
              style="height:80%;margin-top:3%;"
              :style="'width:' + 80 / onTimeWaterQuality.length + '%'"
              @click.native="waterLevelsClicked(item)"
            />
          </div>
        </dv-border-box-8>
      </div>
    </div>
    <div class="content-item-center"></div>
    <div
      class="content-item-right flex all-point-events flex-column justify-space-between"
    >
      <div style="height:50%;" class="bg-black">
        <vue-video :options="videoOptions" />
      </div>
      <div style="height:49%;">
        <div style="text-align:left;font-size:20px;height:36px;">
          <p style="margin:0;">物联网设备预警信息</p>
        </div>
        <dv-scroll-board
          :config="onTimeIot"
          style="width:100%;height:calc(100% - 36px);"
          @click="onTimeIotEventClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import waterLevel from './waterLevel.vue'
import capsuleChartView from './capsuleChartView.vue'
import spinView from './spinView.vue'
import vueVideo from './vue-video.vue'
// import CAMERA_PIC_PATH from '../assets/imgs/camera1_loading.png'
import { mapActions } from 'vuex'

export default {
  components: {
    waterLevel,
    capsuleChartView,
    spinView,
    vueVideo
  },
  props: {},
  data() {
    return {
      waterLevels: [
        {
          id: 0,
          data: {
            title: '大渡河汶川段',
            titleH: 30,
            config: {
              data: [50],
              shape: 'roundRect',
              waveHeight: 10,
              formatter: '{value}%'
            }
          },
          camera: {
            position: [
              102.68574995029584,
              30.973350848001495,
              2798.6877673929557
            ],
            tilt: 76.40884423513269,
            heading: 244.20253800398586
          },
          graphics: [
            {
              geometry: {
                type: 'polyline',
                paths: [
                  [102.68410677204612, 30.972666971580107, 2756],
                  [102.68410677204612, 30.972666971580107, 2770]
                ]
              },
              symbol: {
                type: 'simple-line',
                color: [226, 119, 40],
                width: 4
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2756
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2770
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2760
              },
              symbol: {
                type: 'simple-marker',
                color: [31, 100, 10],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            }
          ]
        },
        {
          id: 1,
          data: {
            title: '紫坪铺水库',
            titleH: 30,
            config: {
              data: [80],
              shape: 'roundRect',
              waveHeight: 10,
              formatter: '{value}%'
            }
          },
          camera: {
            position: [
              102.68574995029584,
              30.973350848001495,
              2798.6877673929557
            ],
            tilt: 76.40884423513269,
            heading: 244.20253800398586
          },
          graphics: [
            {
              geometry: {
                type: 'polyline',
                paths: [
                  [102.68410677204612, 30.972666971580107, 2756],
                  [102.68410677204612, 30.972666971580107, 2770]
                ]
              },
              symbol: {
                type: 'simple-line',
                color: [226, 119, 40],
                width: 4
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2756
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2770
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2768
              },
              symbol: {
                type: 'simple-marker',
                color: [221, 10, 53],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            }
          ]
        },
        {
          id: 2,
          data: {
            title: '嘉陵江1号监测点',
            titleH: 30,
            config: {
              data: [22],
              shape: 'roundRect',
              waveHeight: 10,
              formatter: '{value}%'
            }
          },
          camera: {
            position: [
              102.68418629550149,
              30.974077425675688,
              2846.116471485235
            ],
            tilt: 60.306288197280736,
            heading: 183.50401687293274
          },
          graphics: [
            {
              geometry: {
                type: 'polyline',
                paths: [
                  [102.68410677204612, 30.972666971580107, 2756],
                  [102.68410677204612, 30.972666971580107, 2770]
                ]
              },
              symbol: {
                type: 'simple-line',
                color: [226, 119, 40],
                width: 4
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2756
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2770
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2758
              },
              symbol: {
                type: 'simple-marker',
                color: [31, 100, 10],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            }
          ]
        },
        {
          id: 3,
          data: {
            title: '嘉陵江地下水位',
            titleH: 30,
            config: {
              data: [90],
              shape: 'roundRect',
              waveHeight: 10,
              formatter: '{value}%'
            }
          },
          camera: {
            position: [
              102.68574995029584,
              30.973350848001495,
              2798.6877673929557
            ],
            tilt: 76.40884423513269,
            heading: 244.20253800398586
          },
          graphics: [
            {
              geometry: {
                type: 'polyline',
                paths: [
                  [102.68410677204612, 30.972666971580107, 2756],
                  [102.68410677204612, 30.972666971580107, 2770]
                ]
              },
              symbol: {
                type: 'simple-line',
                color: [226, 119, 40],
                width: 4
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2756
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2770
              },
              symbol: {
                type: 'simple-marker',
                color: [226, 119, 40],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            },
            {
              geometry: {
                type: 'point',
                x: 102.68410677204612,
                y: 30.972666971580107,
                z: 2769
              },
              symbol: {
                type: 'simple-marker',
                color: [221, 10, 53],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                }
              }
            }
          ]
        }
      ],
      onTimeWaterSpeed: {
        title: '实时流速监测',
        leftOrRight: 'right',
        config: {
          data: [
            {
              name: '嘉陵江入口',
              value: 10
            },
            {
              name: '大渡河',
              value: 1
            },
            {
              name: '岷江汶川一号点',
              value: 2
            },
            {
              name: '岷江汶川二号点',
              value: 10
            },
            {
              name: '涪江若尔盖段',
              value: 18
            },
            {
              name: '涪江九寨沟段',
              value: 20
            },
            {
              name: '沱江一桥',
              value: 13
            },
            {
              name: '沱江二桥',
              value: 17
            }
          ],
          colors: [
            '#2EC4B6',
            '#EFFFE9',
            '#2EC4B6',
            '#2EC4B6',
            '#FFBC42',
            '#E71D36',
            '#2EC4B6',
            '#FFBC42'
          ],
          unit: '米每秒'
        }
      },
      onTimeWaterQuality: [
        {
          id: 0,
          data: {
            title: '大渡河',
            dur: 10,
            text: 'Ⅰ级'
          },
          camera: {
            position: [102.6855784336792, 30.9735007450848, 2923.924740260467],
            tilt: 43.00874939326398,
            heading: 240.93287386313952
          },
          graphics: [
            {
              geometry: {
                type: 'polygon',
                rings: [
                  [
                    [102.68402, 30.9727, 2755],
                    [102.68412, 30.9727, 2755],
                    [102.68412, 30.97278, 2755],
                    [102.68402, 30.97278, 2755],
                    [102.68402, 30.9727, 2755]
                  ]
                ]
              },
              symbol: {
                type: 'polygon-3d',
                symbolLayers: [
                  {
                    type: 'extrude',
                    size: 10,
                    material: { color: 'red' }
                  }
                ]
              }
            }
          ]
        },
        {
          id: 1,
          data: {
            title: '嘉陵江',
            dur: 10,
            text: 'Ⅱ级'
          }
        },
        {
          id: 2,
          data: {
            title: '岷江',
            dur: 10,
            text: 'Ⅳ级'
          }
        }
      ],
      onTimeIotData: [
        {
          id: 0,
          date: '2020-02-02 09：00',
          info: '大渡河汶川段水位超过预警线0.3m',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 1,
          date: '2020-02-02 12：38',
          info: '嘉陵江水质降为Ⅱ级，汞超标',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 2,
          date: '2020-02-10 11：56',
          info: '涪江流速达到警戒流速',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 3,
          date: '2020-02-11 09：02',
          info: '一号摄像头识别有人入侵',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 4,
          date: '2020-02-12 10：15',
          info: '紫坪铺水库水位达到警戒线',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 5,
          date: '2020-02-13 19：30',
          info: '嘉陵江1号监测点监测到水位超过预警线0.3m',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 6,
          date: '2020-02-14 23：59',
          info: '涪江二桥水位预警',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          id: 7,
          date: '2020-02-15 13：00',
          info: '岷江水质降为Ⅳ级，磷含量超过预设标准120%',
          camera: {
            position: [
              103.57625175394175,
              31.007923731569164,
              2102.1635767901316
            ],
            tilt: 65.4490188235477,
            heading: 357.2711
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57478486674232,
              y: 31.034105013420085
            },
            symbol: {
              type: 'simple-marker',
              color: [226, 119, 40],
              outline: {
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        }
      ],
      videoOptions: {
        autoplay: true,
        controls: false,
        language: 'zh-CN',
        fluid: true,
        // poster: CAMERA_PIC_PATH,
        sources: [
          {
            src: 'rtmp://117.139.247.104:13008/live/qq',
            type: 'rtmp/flv'
          }
        ],
        notSupportedMessage: '不支持的数据流'
      }
    }
  },
  watch: {},
  computed: {
    onTimeIot() {
      let datas = []
      for (let d of this.onTimeIotData) {
        datas.push([d.date, d.info])
      }
      return {
        header: ['时间', '消息'],
        data: datas,
        index: true,
        columnWidth: [50, 160],
        headerBGC: 'rgba(0,186,255,.5)',
        oddRowBGC: 'rgba(0,59,81,.5)',
        evenRowBGC: 'rgba(10,39,50,.5)',
        indexHeader: ''
      }
    }
  },
  methods: {
    waterLevelsClicked(data) {
      this.setGraphics(data.graphics)
      this.setCamera(data.camera)
    },
    waterQualityClicked(data) {
      this.setGraphics(data.graphics)
      this.setCamera(data.camera)
    },
    onTimeIotEventClicked(data) {
      let eventData = this.onTimeIotData[data.rowIndex]
      this.setGraphics([eventData.graphic])
      this.setCamera(eventData.camera)
    },
    ...mapActions({
      setCamera: 'setCamera',
      setGraphics: 'setGraphics'
    })
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .content-item-left,
  .content-item-right {
    width: 100%;
    height: 100%;
  }

  .content-item-center {
    width: 680px;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
