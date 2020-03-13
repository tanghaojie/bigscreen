<template>
  <div class="content flex none-point-events">
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
</template>

<script>
import chartView from './chartView.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    chartView
  },
  props: {},
  data() {
    return {
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
      onTimeEventData: [
        {
          id: 0,
          date: '2020-02-02 09：00',
          type: '河库坝渗漏垮塌',
          finish: true,
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
          type: '违章建筑',
          finish: true,
          camera: {
            position: [
              103.58261023482338,
              31.020385153958642,
              3497.995936532505
            ],
            tilt: 32.1914660939127,
            heading: 334.35606579492327
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
          type: '污水输排',
          finish: false,
          camera: {
            position: [103.69198626711832, 31.8416930353198, 3653.961192998104],
            tilt: 0.5000018481672852,
            heading: 359.98464838260446
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.69198626711832,
              y: 31.8416930353198
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
          type: '非法捕捞',
          finish: false,
          camera: {
            position: [
              103.6975813572745,
              31.84054564861106,
              2049.2563779409975
            ],
            tilt: 55.73405229906623,
            heading: 287.3831041921205
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.69198626711832,
              y: 31.8416930353198
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
          id: 8,
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
          id: 9,
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
          },
          graphic: {
            geometry: {
              type: 'point',
              x: 103.57303406492765,
              y: 31.032289065395688
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
      let eventData = this.onTimeEventData[data.rowIndex]
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
