<template>
  <div id="index">
    <div class="devFull">
      <!-- <dv-full-screen-container> -->
      <div class="flex flex-container">
        <top />
        <digital-flop />
        <div class="main-container">
          <div
            class="content flex none-point-events"
            v-if="screenMode.statistic == nowScreenMode"
          >
            <div
              class="content-item-left flex all-point-events flex-column justify-space-between"
            >
              <div style="height:32%;">
                <chart-view :data="completionByRegion" />
              </div>
              <div style="height:32%;">
                <chart-view :data="completionRate" />
              </div>
              <div style="height:32%;">
                <chart-view :data="numberOfRecent6Months" />
              </div>
            </div>
            <div class="content-item-center"></div>
            <div
              class="content-item-right flex all-point-events flex-column justify-space-between"
            >
              <div style="height:32%;">
                <chart-view :data="eventDistribute" />
              </div>
              <div style="height:32%;">
                <chart-view :data="completionByEvent" />
                <!-- <e-charts :options="polar" style="width:100%;height:100%;" /> -->
              </div>
              <div style="height:32%;">
                <div style="text-align:left;font-size:20px;height:36px;">
                  <p style="margin:0;">实时巡河事件</p>
                </div>
                <dv-scroll-board
                  :config="onTimeEvent"
                  style="width:100%;height:calc(100% - 36px);"
                  @click="onTimeEventClicked"
                />
              </div>
            </div>
          </div>

          <div
            class="content flex none-point-events"
            v-else-if="screenMode.monitor == nowScreenMode"
          >
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
                      @click.native="test(item.id)"
                    />
                  </div>
                </dv-border-box-1>
              </div>
              <div style="height:32%;">
                <capsule-chart-view :data="onTimeTemperature" />
              </div>
              <div style="height:32%;">
                <dv-border-box-8 :dur="6">
                  <div style="font-size:18px;">水质监测和系统评级</div>
                  <div
                    class="flex flex-row justify-space-around initial-svg-w-h"
                  >
                    <spin-view
                      v-for="item in onTimeWaterQuality"
                      :key="item.id"
                      :data="item.data"
                      style="height:80%;margin-top:3%;"
                      :style="'width:' + 80 / onTimeWaterQuality.length + '%'"
                      @click.native="test(item.id)"
                    />
                  </div>
                </dv-border-box-8>
              </div>
            </div>
            <div class="content-item-center"></div>
            <div
              class="content-item-right flex all-point-events flex-column justify-space-between bg-green opacity-0-3"
            ></div>
          </div>

          <div class="overlay flex flex-row justify-center flex-align-end">
            <div
              class="padding-10 all-point-events"
              @click="setNowScreenMode(screenMode.statistic)"
            >
              <icon name="chart-bar" scale="1.5" style="color:#001c45;" />
            </div>
            <div
              class="padding-10 all-point-events"
              @click="setNowScreenMode(screenMode.monitor)"
            >
              <icon name="eye" scale="1.5" style="color:#001c45;" />
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
import chartView from './chartView.vue'
import capsuleChartView from './capsuleChartView.vue'
import spinView from './spinView.vue'
import waterLevel from './waterLevel.vue'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { mapActions } from 'vuex'

export default {
  components: {
    top,
    webMap,
    digitalFlop,
    chartView,
    capsuleChartView,
    spinView,
    waterLevel,
    ECharts,
    Icon
  },
  props: {},
  data() {
    return {
      screenMode: {
        statistic: 0,
        monitor: 1
      },
      nowScreenMode: undefined,
      completionByRegion: {
        option: {
          legend: {
            data: [
              {
                name: '已巡',
                color: '#00baff'
              },
              {
                name: '应巡',
                color: '#ff5ca9'
              }
            ],
            textStyle: {
              fill: '#fff',
              fontSize: 16
            },
            top: 40,
            left: '10%'
          },
          xAxis: {
            data: [
              '马尔康',
              '汶川',
              '理县',
              '茂县',
              '松潘',
              '九寨沟',
              '金川',
              '小金',
              '黑水',
              '壤塘',
              '阿坝',
              '若尔盖',
              '红原'
            ],
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14,
                rotate: -30
              }
            },
            axisTick: {
              show: false
            },
            rLevel: 99
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },
            min: 0,
            max: 100,
            position: 'left'
          },
          series: [
            {
              name: '已巡',
              data: [100, 20, 30, 40, 50, 60, 70, 80, 90, 100, 5, 5, 10],
              type: 'bar',
              barStyle: {
                fill: 'rgba(0,186,255,0.6)'
              }
            },
            {
              name: '应巡',
              data: [100, 20, 30, 40, 50, 60, 70, 80, 90, 100, 0, 0, 10],
              type: 'bar',
              barStyle: {
                fill: 'rgba(255,92,169,0.6)'
              }
            }
          ]
        },
        title: '各地区巡河次数',
        leftOrRight: 'right'
      },
      numberOfRecent6Months: {
        option: {
          legend: {
            show: false,
            data: [
              {
                name: '次数',
                color: '#00baff'
              }
            ],
            textStyle: {
              fill: '#fff',
              fontSize: 16
            },
            top: 40,
            left: '10%'
          },
          xAxis: {
            data: [
              '2019.09',
              '2019.10',
              '2019.11',
              '2019.12',
              '2020.01',
              '2020.02'
            ],
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14,
                rotate: 0
              }
            },
            axisTick: {
              show: false
            },
            rLevel: 99
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },
            position: 'left'
          },
          series: [
            {
              name: '次数',
              data: [1000, 800, 2000, 1500, 150, 1234],
              type: 'line',
              smooth: false,
              yAxisIndex: 0,
              lineStyle: {
                stroke: '#eeca00'
              },
              linePoint: {
                radius: 4,
                style: {
                  fill: '#978102'
                }
              }
            }
          ]
        },
        title: '近6个月总巡河次数',
        leftOrRight: 'right'
      },
      completionRate: {
        color: ['#fff', '#000'],
        option: {
          radar: {
            center: ['30%', '50%'],
            polygon: false,
            axisLabel: {
              show: true,
              style: {
                fill: '#fff',
                fontSize: 16,
                rotate: 0
              }
            },
            splitArea: {
              show: true,
              color: [
                'rgba(72,18,0, 1)',
                'rgba(149,64,0, 1)',
                'rgba(88,78,0 , 1)',
                'rgba(39,75,0, 1)',
                'rgba(11,87,0, 1)'
              ]
            },
            axisLine: {
              show: true
            },
            splitLine: {
              show: true
            },
            indicator: [
              { name: '马尔康', max: 100 },
              { name: '汶川', max: 100 },
              { name: '理县', max: 100 },
              { name: '茂县', max: 100 },
              { name: '松潘', max: 100 },
              { name: '九寨沟', max: 100 },
              { name: '金川', max: 100 },
              { name: '小金', max: 100 },
              { name: '黑水', max: 100 },
              { name: '壤塘', max: 100 },
              { name: '阿坝', max: 100 },
              { name: '若尔盖', max: 100 },
              { name: '红原', max: 100 }
            ]
          },
          series: [
            {
              type: 'radar',
              data: [91, 73, 82, 88, 56, 89, 100, 40, 96, 63, 57, 61, 29],
              radarStyle: {
                lineWidth: 2,
                fill: 'rgba(107,145,186,.9)',
                stroke: 'rgba(255,255,255,1)'
              },
              label: {
                offset: [0, 0],
                style: {
                  fontSize: 12,
                  fill: '#fff'
                }
              },
              point: {
                radius: 3,
                style: {
                  fill: '#fff',
                  stroke: '#fff'
                }
              }
            }
          ]
        },
        title: '各地区巡河完成率',
        leftOrRight: 'right'
      },
      eventDistribute: {
        option: {
          series: [
            {
              data: [
                {
                  name: '河岸垃圾',
                  value: 4
                },
                {
                  name: '漂浮物',
                  value: 18
                },
                {
                  name: '破坏岸线',
                  value: 10
                },
                {
                  name: '非法捕捞',
                  value: 18
                },
                {
                  name: '河库坝渗漏垮塌',
                  value: 4
                },
                {
                  name: '污水输排',
                  value: 20
                },
                {
                  name: '违章建筑',
                  value: 20
                }
              ],
              type: 'pie',
              radius: '70%',
              center: ['60%', '60%'],
              insideLabel: {
                show: false
              },
              outsideLabel: {
                show: true,
                formatter: `{name} {percent}%`,
                labelLineBendGap: 10,
                labelLineEndLength: 5,
                style: {
                  fontSize: 16
                }
              }
            }
          ]
        },
        title: '巡河事件类型分布'
      },
      onTimeEventData: [
        {
          date: '2020-02-02 09：00',
          type: '河库坝渗漏垮塌',
          finish: true,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          },
          graphic: {
            geometry: {
              type: 'point',
              x: -0.178,
              y: 51.48791
              // z: 1000
            },
            symbol: {
              type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          date: '2020-02-02 12：38',
          type: '违章建筑',
          finish: true,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          },
          graphic: {
            geometry: {
              type: 'point',
              x: -0.178,
              y: 51.49
              // z: 1000
            },
            symbol: {
              type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
              color: [226, 119, 40],
              outline: {
                // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 2
              }
            }
          }
        },
        {
          date: '2020-02-10 11：56',
          type: '污水输排',
          finish: false,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 111,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-11 09：02',
          type: '非法捕捞',
          finish: false,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-12 10：15',
          type: '河岸垃圾',
          finish: true,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-13 19：30',
          type: '破坏岸线',
          finish: false,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-14 23：59',
          type: '非法捕捞',
          finish: true,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-15 13：00',
          type: '污水输排',
          finish: true,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-16 17：20',
          type: '漂浮物',
          finish: false,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        },
        {
          date: '2020-02-17 18：23',
          type: '违章建筑',
          finish: false,
          camera: {
            position: [
              103.64900637668494,
              30.945060583094236,
              2672.7336980625987
            ],
            tilt: 83.98,
            heading: 325.16530992524247
          }
        }
      ],
      completionByEvent: {
        option: {
          legend: {
            data: [
              {
                name: '已处理',
                color: '#00baff'
              },
              {
                name: '待处理',
                color: '#ff5ca9'
              }
            ],
            textStyle: {
              fill: '#fff',
              fontSize: 16
            },
            top: 40,
            right: '10%'
          },
          xAxis: {
            data: [
              '河岸有垃圾',
              '漂浮物',
              '破坏岸线',
              '非法捕捞',
              '渗漏垮塌',
              '污水输排',
              '违章建筑'
            ],
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14,
                rotate: 0
              }
            },
            axisTick: {
              show: false
            },
            rLevel: 99
          },
          yAxis: {
            data: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              style: {
                stroke: '#fff'
              }
            },
            axisLabel: {
              style: {
                fill: '#fff',
                fontSize: 14
              }
            },
            axisTick: {
              show: false
            },
            min: 0,
            // max: 100,
            position: 'right'
          },
          series: [
            {
              name: '已处理',
              data: [100, 120, 130, 400, 250, 360, 170],
              type: 'bar',
              barStyle: {
                fill: 'rgba(0,186,255,0.6)'
              }
            },
            {
              name: '待处理',
              data: [100, 20, 30, 40, 50, 60, 70],
              type: 'bar',
              barStyle: {
                fill: 'rgba(255,92,169,0.6)'
              }
            }
          ]
        },
        title: '事件处理情况汇总',
        leftOrRight: 'left'
      },
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
          }
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
          }
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
          }
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
          }
        }
      ],
      onTimeTemperature: {
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
          }
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
      ]
    }
  },
  watch: {},
  computed: {
    onTimeEvent() {
      let datas = []
      for (let d of this.onTimeEventData) {
        datas.push([
          d.date,
          d.type,
          d.finish
            ? '<span style="color:#3aca03;">是</span>'
            : '<span style="color:#fb1100;">否</span>'
        ])
      }
      return {
        header: ['上报时间', '事件类型', '已处理'],
        data: datas,
        index: true,
        columnWidth: [50],
        headerBGC: 'rgba(0,186,255,.5)',
        oddRowBGC: 'rgba(0,59,81,.5)',
        evenRowBGC: 'rgba(10,39,50,.5)',
        indexHeader: ''
      }
    }
  },
  methods: {
    onTimeEventClicked(data) {
      // let camera = this.onTimeEventData[data.rowIndex].camera
      // this.setCamera(camera)
      this.pushGraphic(this.onTimeEventData[data.rowIndex].graphic)
    },
    setNowScreenMode(mode) {
      this.nowScreenMode = mode
    },
    test(id) {
      console.log(id)
    },
    ...mapActions({
      setCamera: 'setCamera',
      setGraphics: 'setGraphics',
      pushGraphic: 'pushGraphics'
    })
  },
  created() {
    this.nowScreenMode = this.screenMode.monitor
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
      background-image: url('../assets/bg_container.png');

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

      .overlay {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        background-image: url('../assets/bg_overlay4_container.png');
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
