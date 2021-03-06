// 组件基本【设置项】 - 不包含自身的props
export const componentBaseConfig = (isSetup) => {
  let baseConfig = [
    {
      name: "x",
      key: "x",
      inputType: "number",
      default: 400,
    },
    {
      name: "y",
      key: "y",
      inputType: "number",
      default: 300,
    },
    {
      name: "w",
      key: "w",
      type: "input",
      default: 400,
    },
    {
      name: "h",
      key: "h",
      type: "input",
      default: 400,
    },
    {
      name: "层级",
      key: "z",
      inputType: "number",
      default: 1,
      min: 0,
    },
    {
      name: "切换大小",
      key: "resizable",
      type: "switch",
      default: true
    },
    {
      name: "移动位置",
      key: "draggable",
      type: "switch",
      default: true
    },
    {
      name: "横纵比锁定",
      key: "lockAspectRatio",
      type: "switch",
      default: false
    },

  ];
  if (isSetup) {
    return baseConfig
  } else {
    let obj = {}
    baseConfig.forEach(item => {
      obj[item.key] = item.default
    })
    return obj
  }
}
