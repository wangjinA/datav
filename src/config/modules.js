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
