export const echart = [
  {
    id: 1,
    background: '#000',
    name: '头部',
    componentName: 'HeaderV1',
    previewImage: require('@/config/images/头部v1.jpg'),
    componentOption: {
      color: '#fff',
      size: 50,
      title: '汕头市应急管理综合应用平台'
    },
    utilOption: {
      color: 'input',
      size: {
        type: 'number',
        min: 20,
        max: 80
      }
    },
    editOption: {
      w: '100%',
      h: 77,
      y: 0,
      x: 0
    }
  }, {
    id: 2,
    width: '100%',
    height: 200,
    background: '#000',
    name: '应急维稳保障',
    previewImage: require('@/config/images/柱状图.jpg'),

    componentName: 'echart-template',
    componentOption: {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '17%',
          right: '3%',
          left: '8%',
          bottom: '10%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['全市', '濠江区', '潮阳区', '潮南区', '澄海区', '龙湖区', '金平区', '南澳县'],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#027DB3',
                width: 2,
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 10,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 12
              }
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              formatter: '{value}',
              color: '#e2e9ff',
              textStyle: {
                fontSize: 14
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#027DB3',
                width: 2,
              }
            },
            splitLine: {
              lineStyle: {
                color: '#027DB3',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [170, 220, 180, 210, 169, 230, 170, 210],
            barWidth: '15px',
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ['#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE', '#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE']
                  return colorList[params.dataIndex]
                },
                barBorderRadius: [30, 30, 0, 0],
                // shadowBlur: 4
              }
            },
            label: {
              normal: {
                show: true,
                position: 'outside'
              }
            }
          }
        ]
      }
    },
    utilOption: {
      color: 'input',
      size: {
        type: 'number',
        min: 20,
        max: 80
      }
    },
    editOption: {
      w: 520,
      h: 250,
      y: 77,
      x: 0
    }
  }, {
    id: 3,
    background: '#000',
    name: '3d云标签',
    componentName: 'threed-tags',
    previewImage: require('@/config/images/3d云标签.png'),
    componentOption: {
      color: '#fff',
      list: [
        '新冠病毒',
        '社会环境',
        '地摊',
        '谨防诈骗',
        '大前端',
        'JavaScript',
        'CSS',
        'HTML',
        'Vue',
        'less',
        'webpack'
      ]
    },
    utilOption: {
      color: 'input',
      size: {
        type: 'number',
        min: 20,
        max: 80
      }
    },
    editOption: {
      w: 400,
      h: 400,
      y: 0,
      x: 520
    }
  }
]

export const text = [
  {
    id: 4,
    background: '#000',
    name: '滚动文字',
    componentName: 'ScrollText',
    previewImage: require('@/config/images/滚动文本.png'),
    componentOption: {
      text: '风圈半径：七级风圈半径 东北方向200公里；东南方向170公里；西南方向120公里；西北方向140公里 十级风圈半径　东北方向60公里；东南方向50公里；西南方向30公里；西北方向40公里预报结论：“白海豚”将以每小时15-20公里的速度向东北方向移动，强度变化不大时 间：23 日 10 时命 名：“白海豚”，DOLPHIN中心位置：北纬31.0度、东经137.0度强度等级：强热带风暴最大风力：10级， 28米/秒（约101公里/小时）中心气压：980 hPa参考位置：位于日本以南洋面，距离日本东京南偏西方向约580公里'
    },
    utilOption: {
      color: 'input',
      size: {
        type: 'number',
        min: 20,
        max: 80
      }
    },
    editOption: {
      w: '100%',
      h: 45,
      y: 0,
      x: 0
    }
  }
]

export default [
  ...echart,
  ...text
]