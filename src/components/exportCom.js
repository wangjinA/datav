/*
 * @Author: 汪锦
 * @Date: 2020-12-17 20:52:08
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-17 21:10:56
 * @Description: 批量导出组件 - 如果是有一层目录的组件需要提供index.js导出；每个组件必须要定义name 大写开头
 */

let components = {} // 当前文件夹下的组件
const componentsContextDir = require.context('./', true, /index\.js$/)

// 注册组件库 - 目录下的
componentsContextDir.keys().forEach(pathName => {
  const componentConfig = componentsContextDir(pathName)
  const c = componentConfig.default || componentConfig
  components[c.name] = c
})

const requireComponent = require.context('./', false, /\.vue$/)
// 注册组件库 - 目录下的
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const c = componentConfig.default || componentConfig
  components[c.name] = c
})

export default components

