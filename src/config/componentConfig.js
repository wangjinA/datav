import { API } from '@/api'
import { componentBaseConfig } from "@/config/modules";
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
// 最终生成的对象 key = props下的default
// props: {
//   color: {
//     name: "字体颜色",
//     setupType: "color",
//     type: String,
//     default: "#21DFFF",
//   },
// },
const getBaseOption = (cName, isSetup = false) => {
  let option = {
    // 模板↓
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
              inputType: item.setupInputType,
              codeType: item.setupCodeType,
              name: item.name,
              key: key,
              data: item.data
            })
          } else {
            if (Object.prototype.hasOwnProperty.call(item, 'default')) {
              option[key] = typeof item.default === 'function' ? item.default() : item.default
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
      ...componentBaseConfig(),
      w: 520,
      h: 250,
    }
  }, {
    id: 3,
    name: '3d云标签',
    componentName: 'ThreedTags',
    previewImage: require('@/config/images/3d云标签.png'),
    componentOption: getBaseOption('ThreedTags'),
    componentSetup: [
      ...getBaseOption('ThreedTags', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 450,
      h: 450,
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
      ...componentBaseConfig(),
      w: 80,
      h: 25,
      x: 500,
      y: 300,
    }
  },
  {
    id: 1,
    name: '头部',
    componentName: 'HyHeader',
    previewImage: require('@/config/images/头部v1.jpg'),
    componentOption: getBaseOption('HyHeader'),
    componentSetup: [
      ...getBaseOption('HyHeader', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: '100%',
      h: 77,
      y: 0,
      x: 0
    }
  }, {
    id: 4,
    name: '滚动文字',
    componentName: 'ScrollText',
    previewImage: require('@/config/images/滚动文本.png'),
    componentOption: getBaseOption('ScrollText'),
    componentSetup: [
      ...getBaseOption('ScrollText', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: '100%',
      h: 45,
      x: 0,
      y: 77
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
      ...componentBaseConfig(),
      w: 330,
      h: 100,
    }
  }
]

export const base = [
  {
    id: 6,
    name: '模块标题',
    componentName: 'ModuleTitle',
    previewImage: require('@/config/images/模块标题.png'),
    componentOption: getBaseOption('ModuleTitle'),
    componentSetup: [
      ...getBaseOption('ModuleTitle', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 350,
      h: 45,
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
      ...componentBaseConfig(),
      w: '100%',
      h: '100%',
      y: 0,
      x: 0,
      resizable: false,
      draggable: false
    }
  }
]


export default [
  ...echart,
  ...text,
  ...base
]