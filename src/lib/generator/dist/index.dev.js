"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _store = _interopRequireDefault(require("@/store"));

var _utils = require("@/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Author: 汪锦
 * @Date: 2020-12-31 16:45:37
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-31 17:58:06
 * @Description: 代码生成器
 */
// import { beautifierJs } from "@/lib/Beautifier";
// 引入组件
function importComponents() {
  var resourceLayers = _store["default"].state.layer.resourceLayers;
  var str = '';
  resourceLayers.forEach(function (item) {
    str += "\n  import ".concat(item.componentName, " from \"@/components/").concat(item.componentName, "\";");
  });
  return str;
} // 注册组件


function registerComponents() {
  var resourceLayers = _store["default"].state.layer.resourceLayers;
  var str = '';
  resourceLayers.forEach(function (item) {
    str += "\n      ".concat(item.componentName, ",");
  });
  return str;
} // 生成定位布局


function getStyles() {
  var _store$state$layer = _store["default"].state.layer,
      resourceLayers = _store$state$layer.resourceLayers,
      datavInfo = _store$state$layer.datavInfo;
  var str = '';
  var style = datavInfo && datavInfo.style;
  var width = style ? style.w : 0;
  var height = style ? style.h : 0;
  resourceLayers.forEach(function (item) {
    var editOption = item.editOption;
    str += "\n        ".concat(item.componentName, "Style: {\n          position: 'absolute',\n          zIndex: ").concat(editOption.z, ",\n          width: '").concat((0, _utils.getBfb)(editOption.w, width), "px',\n          width: '").concat((0, _utils.getBfb)(editOption.h, height), "px',\n          left: '").concat((0, _utils.getInt)(editOption.x), "px',\n          top: '").concat((0, _utils.getInt)(editOption.y), "px',\n        },\n    ");
  });
  return str;
} // 获取组件属性传值


function getComponentsAttr() {
  var resourceLayers = _store["default"].state.layer.resourceLayers;
  var str = '';
  resourceLayers.forEach(function (item) {
    var componentOption = item.componentOption;
    str += "\n        ".concat(item.componentName, "Attr: ").concat(JSON.stringify(componentOption), ",\n    ");
  });
  return str;
}

function getScript() {
  var scriptStr = "\n<script>\n  ".concat(importComponents(), "\n\n  export default {\n    components: {").concat(registerComponents(), "\n    },\n    data() {\n      return {").concat(getStyles()).concat(getComponentsAttr(), "\n      }\n    },\n  }\n</script>");
  return scriptStr;
}

function _default() {
  var resourceLayers = _store["default"].state.layer.resourceLayers;
  var componentStr = '';
  resourceLayers.forEach(function (item) {
    componentStr += "\n    <!-- ".concat(item.name, " -->\n    <div :style=\"").concat(item.componentName, "Style\">\n      <").concat(item.componentName, " v-bind=\"").concat(item.componentName, "Attr\"/>\n    </div>\n    ");
  });
  var htmlStr = "<template>\n  <div>\n    ".concat(componentStr, "\n  </div>\n</template>\n  ");
  var result = htmlStr + getScript();
  console.log(result);
  return result;
}