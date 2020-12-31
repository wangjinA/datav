/*
 * @Author: 汪锦
 * @Date: 2020-12-31 16:45:37
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 17:58:06
 * @Description: 代码生成器
 */
import store from '@/store'


function importComponent() {
  const { resourceLayers } = store.state.layer
  let str = ''
  resourceLayers.forEach(item => {
    str += `
      import ${item.componentName} from "@/components/${item.componentName}";
    `
  })
  return str
}

export default function () {
  const { resourceLayers } = store.state.layer
  let componentStr = ''
  resourceLayers.forEach(item => {
    componentStr += `
      <!-- ${item.name} -->
      <div :style="${item.componentName}-style">
        <${item.componentName} />
      </div>
    `
  })
  const htmlStr = `
    <template>
      <div>
        ${componentStr}
      </div>
    </template>
  `
  const scriptStr = `
    <script>
      ${importComponent()}
    </script>
  `
  let result = htmlStr + scriptStr
  console.log(result);
  return result
}