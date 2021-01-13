/*
 * @Author: 汪锦
 * @Date: 2020-12-31 16:45:37
 * @LastEditors: 汪锦
 * @LastEditTime: 2021-01-13 15:44:30
 * @Description: 代码生成器
 */
import store from '@/store'
import { getInt, getBfb, getStrCount } from "@/lib/utils";
// import { beautifierJs } from "@/lib/Beautifier";

// 引入组件
function importComponents() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    if (str.indexOf(`import ${item.componentName}`) === -1) {
      str += `
  import ${item.componentName} from "@/components/${item.componentName}";`
    }
  })
  return str
}

// 注册组件
function registerComponents() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    if (str.indexOf(item.componentName) === -1) {
      str += `
      ${item.componentName},`
    }
  })
  return str

}

// 生成定位布局
function getStyles() {
  const { resourceLayers, datavInfo } = store.state.layer
  let str = ''
  const style = datavInfo && datavInfo.style;
  const width = style ? style.w : 0;
  const height = style ? style.h : 0;
  resourceLayers.forEach(item => {
    let num = getStrCount(str, `${item.componentName}Style`) || ''
    const editOption = item.editOption
    str += `
        ${item.componentName}Style${num}: {
          position: 'absolute',
          zIndex: ${editOption.z},
          width: '${getBfb(editOption.w, width)}px',
          height: '${getBfb(editOption.h, height)}px',
          left: '${getInt(editOption.x)}px',
          top: '${getInt(editOption.y)}px',
        },
    `
  })
  return str
}

// 获取组件属性传值
function getComponentsAttr() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    const componentOption = item.componentOption
    let num = getStrCount(str, `${item.componentName}Attr`) || ''
    str += `
        ${item.componentName}Attr${num}: ${JSON.stringify(componentOption)},
    `
  })
  return str

}
// 获取script内容
function getScript() {

  let scriptStr = `
<script>
  ${importComponents()}

  export default {
    components: {${registerComponents()}
    },
    data() {
      return {${getStyles()}${getComponentsAttr()}
      }
    },
  }
</script>`
  return scriptStr
}

// 获取组件标签列表
function getComponentsTags() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    let attrNum = getStrCount(str, `${item.componentName}Attr`) || ''
    let styleNum = getStrCount(str, `${item.componentName}Style`) || ''
    str += `
    <!-- ${item.name} -->
    <div :style="${item.componentName}Style${styleNum}">
      <${item.componentName} v-bind="${item.componentName}Attr${attrNum}"/>
    </div>
    `
  })
  return str
}

export default function () {

  const htmlStr = `<template>
  <div>
    ${getComponentsTags()}
  </div>
</template>
  `
  let result = htmlStr + getScript()
  console.log(result);
  return result
}