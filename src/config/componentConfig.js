import { API } from '@/api'
import { componentBaseConfig } from "@/config/modules";
import * as echartList from "./echartList";
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
              min: item.min,
              max: item.max,
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
export const echart = [
  {
    id: 1,
    name: '图表自定义',
    previewImage: require('@/config/images/图表自定义.png'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: ``
    },
    componentSetup: [
      {
        name: 'echart配置',
        key: 'options',
        codeType: 'javascript',
      }
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 430,
      h: 200,
    }
  },
  {
    id: 2,
    name: '柱状图',
    previewImage: require('@/config/images/柱状图.jpg'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: echartList.zzt
    },
    componentSetup: [
      ...getBaseOption('EchartTemplate', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 430,
      h: 200,
    }
  },
  {
    id: 3,
    name: '横向柱状图',
    previewImage: require('@/config/images/横向柱状图.png'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: echartList.zzt1
    },
    componentSetup: [
      ...getBaseOption('EchartTemplate', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 430,
      h: 200,
    }
  },
  {
    id: 4,
    name: '折线图',
    previewImage: require('@/config/images/折线图.png'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: echartList.zxt
    },
    componentSetup: [
      ...getBaseOption('EchartTemplate', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 430,
      h: 200,
    }
  },
  {
    id: 5,
    name: '折线图',
    previewImage: require('@/config/images/折线图1.png'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: echartList.zxt1
    },
    componentSetup: [
      ...getBaseOption('EchartTemplate', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 430,
      h: 200,
    }
  }, {
    id: 6,
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
      lockAspectRatio: true
    }
  }, {
    id: '仪表盘-1',
    name: '仪表盘',
    previewImage: require('@/config/images/仪表盘.png'),
    componentName: 'EchartTemplate',
    componentOption: {
      options: echartList.ybp
    },
    componentSetup: [
      ...getBaseOption('EchartTemplate', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 220,
      h: 220,
    }
  }, {
    id: '飞线地图-1',
    name: '飞线地图',
    previewImage: require('@/config/images/飞线地图.png'),
    componentName: 'flyLineMap',
    componentOption: getBaseOption('flyLineMap'),
    componentSetup: [
      ...getBaseOption('flyLineMap', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 220,
      h: 220,
    }
  }
]

export const text = [
  {
    id: 7,
    name: '普通文字',
    componentName: 'BaseText',
    previewImage: require('@/config/images/普通文字.png'),
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
  }, {
    id: 8,
    name: '数字累加器',
    componentName: 'BaseNumber',
    previewImage: require('@/config/images/普通文字.png'),
    componentOption: getBaseOption('BaseNumber'),
    componentSetup: [
      ...getBaseOption('BaseNumber', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 120,
      h: 45,
      x: 500,
      y: 300,
    }
  },
  {
    id: 9,
    name: '头部',
    componentName: 'HyHeader',
    previewImage: require('@/config/images/头部v1.png'),
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
    id: 13,
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
  }, {
    id: 10,
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
    id: 11,
    name: '文字模块',
    componentName: 'BlockList',
    previewImage: require('@/config/images/文字模块.png'),
    componentOption: getBaseOption('BlockList'),
    componentSetup: [
      ...getBaseOption('BlockList', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 330,
      h: 100,
    }
  }, {
    id: 12,
    name: '图片',
    componentName: 'BaseImage',
    previewImage: require('@/config/images/基本图片.png'),
    componentOption: getBaseOption('BaseImage'),
    componentSetup: [
      ...getBaseOption('BaseImage', true)
    ],
    editOption: {
      ...componentBaseConfig(),
      w: 200,
      h: 200,
    }
  }
]

export const base = [

  {
    id: 14,
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
      z: 0,
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