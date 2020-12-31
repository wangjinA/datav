/*
 * @Author: 汪锦
 * @Date: 2020-12-31 16:45:37
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 17:58:06
 * @Description: 代码生成器
 */
import store from '@/store'
import { getInt, getBfb } from "@/lib/utils";
// import { beautifierJs } from "@/lib/Beautifier";

// 引入组件
function importComponents() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    str += `
  import ${item.componentName} from "@/components/${item.componentName}";`
  })
  return str
}

// 注册组件
function registerComponents() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    str += `
      ${item.componentName},`
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
    const editOption = item.editOption
    str += `
        ${item.componentName}Style: {
          position: 'absolute',
          zIndex: ${editOption.z},
          width: '${getBfb(editOption.w, width)}px',
          width: '${getBfb(editOption.h, height)}px',
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
    str += `
        ${item.componentName}Attr: ${JSON.stringify(componentOption)},
    `
  })
  return str

}

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

export default function () {
  const { resourceLayers } = store.state.layer
  let componentStr = ''
  resourceLayers.forEach(item => {
    componentStr += `
    <!-- ${item.name} -->
    <div :style="${item.componentName}Style">
      <${item.componentName} v-bind="${item.componentName}Attr"/>
    </div>
    `
  })
  const htmlStr = `<template>
  <div>
    ${componentStr}
  </div>
</template>
  `
  let result = htmlStr + getScript()
  console.log(result);
  return result
}