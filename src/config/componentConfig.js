import { API } from '@/api'

const bgList = [] // 视频列表
API.getBgList().then(res => {
  bgList.splice(0, bgList.length)
  res.data.filter(i => i.type === 1).map(item => {
    bgList.push({
      name: item.name,
      value: item.src
    })
  })
})

import C from '@/components/exportCom'
console.log(C.BaseText);
const getBaseOption = (cName, isSetup = false) => {
  // 最终生成的对象 key = props下的default
  let option = {
    // fontSize: '16px',
    // color: '#fff'
  }
  let setup = []
  let targetC = C[cName]
  // props是对象则获取默认的default
  if (targetC) {
    let props = targetC.props
    if (props && props instanceof Object) {
      Object.keys(props).forEach(key => {
        const item = props[key]
        if (item instanceof Object) {
          if (isSetup && item.name) {
            setup.push({
              type: item.setupType,
              name: item.name,
              key: key
            })
          } else {
            if (Object.prototype.hasOwnProperty.call(item, 'default')) {
              option[key] = item.default
            }
          }
        }
      })
    }
  }
  return isSetup ? setup : option

}
// const baseConfig = {
//   fontSize: {
//     name: '字体大小',
//     key: 'fontSize',
//   },
//   color: {
//     name: '字体颜色',
//     key: 'color',
//     type: 'color'
//   },
// }

export const echart = [
  {
    id: 2,
    width: '100%',
    height: 200,
    background: '#000',
    name: '应急维稳保障',
    previewImage: require('@/config/images/柱状图.jpg'),

    componentName: 'EchartTemplate',
    componentOption: {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '5%',
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
                color: (params) => { let colorList = ['#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE', '#0ED6F4', '#FFB56C', '#02A1FD', '#5AE7AE']; return colorList[params.dataIndex] },
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
    componentSetup: [],
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
      speed: 1,
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
    componentSetup: [{
      name: '速度',
      key: 'speed',
      inputType: 'number',
    }, {
      name: '数据',
      key: 'list',
      codeType: 'JSON',
    }],
    editOption: {
      w: 320,
      h: 320,
      y: 0,
      x: 0
    }
  }
]

export const text = [
  {
    id: 1123,
    name: '普通文字',
    componentName: 'BaseText',
    previewImage: require('@/config/images/头部v1.jpg'),
    componentOption: getBaseOption('BaseText'),
    componentSetup: [
      ...getBaseOption('BaseText', true)
    ],
    editOption: {
      w: 80,
      h: 25,
      x: 500,
      y: 300,
    }
  },
  {
    id: 1,
    background: '#000',
    name: '头部',
    componentName: 'HyHeader',
    previewImage: require('@/config/images/头部v1.jpg'),
    componentOption: {
      color: '#fff',
      size: 50,
      title: '汕头市应急管理综合应用平台',
      type: 0
    },
    componentSetup: [
      {
        name: '风格',
        key: 'type',
        type: 'select',
        data: [{
          name: '默认',
          value: 0,
        }, {
          name: '风格2',
          value: 1
        }, {
          name: '风格3',
          value: 2
        }]
      },
      {
        name: '颜色',
        type: 'input',
        key: 'color'
      }, {
        name: '标题',
        key: 'title'
      }
    ],
    editOption: {
      w: '100%',
      h: 77,
      y: 0,
      x: 0
    }
  }, {
    id: 4,
    background: '#000',
    name: '滚动文字',
    componentName: 'ScrollText',
    previewImage: require('@/config/images/滚动文本.png'),
    componentOption: {
      text: '风圈半径：七级风圈半径 东北方向200公里；东南方向170公里；西南方向120公里；西北方向140公里 十级风圈半径　东北方向60公里；东南方向50公里；西南方向30公里；西北方向40公里预报结论：“白海豚”将以每小时15-20公里的速度向东北方向移动，强度变化不大时 间：23 日 10 时命 名：“白海豚”，DOLPHIN中心位置：北纬31.0度、东经137.0度强度等级：强热带风暴最大风力：10级， 28米/秒（约101公里/小时）中心气压：980 hPa参考位置：位于日本以南洋面，距离日本东京南偏西方向约580公里'
    },
    componentSetup: [
      {
        name: '文本',
        key: 'text'
      }
    ],
    editOption: {
      w: '100%',
      h: 45,
      y: 0,
      x: 0
    }
  }, {
    id: 5,
    name: '文字模块',
    componentName: 'BlockList',
    previewImage: require('@/config/images/文字模块.png'),
    componentOption: {
      gap: 5,
      list: [
        {
          name: "人口流入",
          value: 200,
        },
        {
          name: "人口流出",
          value: 200,
        },
        {
          name: "人口总数",
          value: 200,
        },
      ],
    },
    componentSetup: [
      {
        name: '间距',
        key: 'gap',
        inputType: 'number',
      }, {
        name: '数据',
        key: 'list',
        codeType: 'JSON',
      }
    ],
    editOption: {
      w: 330,
      h: 100,
      y: 0,
      x: 0
    }
  }
]

export const base = [
  {
    id: 6,
    name: '模块标题',
    componentName: 'ModuleTitle',
    previewImage: require('@/config/images/模块标题.png'),
    componentOption: {
      title: '今日人口流动',
      type: 0
    },
    componentSetup: [
      {
        name: '风格',
        key: 'type',
        type: 'select',
        data: [{
          name: '默认',
          value: 0,
        }, {
          name: '风格2',
          value: 1
        }]
      }, {
        name: '标题',
        key: 'title'
      }
    ],
    editOption: {
      w: 350,
      h: 45,
      y: 0,
      x: 0
    }
  },
  {
    id: 7,
    name: '视频背景',
    zIndex: 0,
    componentName: 'VideoBg',
    previewImage: require('@/config/images/视频背景.png'),
    componentOption: {
      src: '_common/科技背景-压缩.webm',
    },
    componentSetup: [
      {
        name: '背景',
        key: 'src',
        type: 'select',
        data: bgList
      }
    ],
    editOption: {
      w: '100%',
      h: '100%',
      y: 0,
      x: 0
    }
  }
]


export default [
  ...echart,
  ...text,
  ...base
]