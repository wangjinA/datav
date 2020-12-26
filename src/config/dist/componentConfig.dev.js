"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.base = exports.text = exports.echart = void 0;

var _api = require("@/api");

var _modules = require("@/config/modules");

var echartList = _interopRequireWildcard(require("./echartList"));

var _exportCom = _interopRequireDefault(require("@/components/exportCom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bgList = []; // 视频列表

_api.API.getBgList().then(function (res) {
  bgList.splice(0, bgList.length);
  res.data.filter(function (i) {
    return i.type === 1;
  }).map(function (item) {
    bgList.push({
      name: item.name,
      value: item.src
    });
  });
});

// 最终生成的对象 key = props下的default
// props: {
//   color: {
//     name: "字体颜色",
//     setupType: "color",
//     type: String,
//     default: "#21DFFF",
//   },
// },
var getBaseOption = function getBaseOption(cName) {
  var isSetup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var option = {// 模板↓
    // fontSize: '16px',
    // color: '#fff'
  };
  var setup = [];
  var targetC = _exportCom["default"][cName]; // props是对象则获取默认的default

  if (targetC) {
    var props = targetC.props;

    if (props && props instanceof Object) {
      Object.keys(props).forEach(function (key) {
        var item = props[key];

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
            });
          } else {
            if (Object.prototype.hasOwnProperty.call(item, 'default')) {
              option[key] = typeof item["default"] === 'function' ? item["default"]() : item["default"];
            }
          }
        }
      });
    }
  }

  return isSetup ? setup : option;
};

var echart = [{
  name: '图表自定义',
  previewImage: require('@/config/images/柱状图.jpg'),
  componentName: 'EchartTemplate',
  componentOption: {
    options: ""
  },
  componentSetup: [{
    name: 'echart配置',
    key: 'options',
    codeType: 'javascript'
  }],
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 430,
    h: 200
  })
}, {
  name: '柱状图',
  previewImage: require('@/config/images/柱状图.jpg'),
  componentName: 'EchartTemplate',
  componentOption: {
    options: echartList.zzt
  },
  componentSetup: _toConsumableArray(getBaseOption('EchartTemplate', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 430,
    h: 200
  })
}, {
  name: '横向柱状图',
  previewImage: require('@/config/images/柱状图.jpg'),
  componentName: 'EchartTemplate',
  componentOption: {
    options: echartList.zzt1
  },
  componentSetup: _toConsumableArray(getBaseOption('EchartTemplate', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 430,
    h: 200
  })
}, {
  name: '折线图',
  previewImage: require('@/config/images/柱状图.jpg'),
  componentName: 'EchartTemplate',
  componentOption: {
    options: echartList.zxt
  },
  componentSetup: _toConsumableArray(getBaseOption('EchartTemplate', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 430,
    h: 200
  })
}, {
  name: '折线图',
  previewImage: require('@/config/images/柱状图.jpg'),
  componentName: 'EchartTemplate',
  componentOption: {
    options: echartList.zxt1
  },
  componentSetup: _toConsumableArray(getBaseOption('EchartTemplate', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 430,
    h: 200
  })
}, {
  name: '3d云标签',
  componentName: 'ThreedTags',
  previewImage: require('@/config/images/3d云标签.png'),
  componentOption: getBaseOption('ThreedTags'),
  componentSetup: _toConsumableArray(getBaseOption('ThreedTags', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 450,
    h: 450
  })
}];
exports.echart = echart;
var text = [{
  name: '普通文字',
  componentName: 'BaseText',
  previewImage: require('@/config/images/普通文字.png'),
  componentOption: getBaseOption('BaseText'),
  componentSetup: _toConsumableArray(getBaseOption('BaseText', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 80,
    h: 25,
    x: 500,
    y: 300
  })
}, {
  name: '头部',
  componentName: 'HyHeader',
  previewImage: require('@/config/images/头部v1.png'),
  componentOption: getBaseOption('HyHeader'),
  componentSetup: _toConsumableArray(getBaseOption('HyHeader', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: '100%',
    h: 77,
    y: 0,
    x: 0
  })
}, {
  name: '滚动文字',
  componentName: 'ScrollText',
  previewImage: require('@/config/images/滚动文本.png'),
  componentOption: getBaseOption('ScrollText'),
  componentSetup: _toConsumableArray(getBaseOption('ScrollText', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: '100%',
    h: 45,
    x: 0,
    y: 77
  })
}, {
  name: '文字模块',
  componentName: 'BlockList',
  previewImage: require('@/config/images/文字模块.png'),
  componentOption: getBaseOption('BlockList'),
  componentSetup: _toConsumableArray(getBaseOption('BlockList', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 330,
    h: 100
  })
}, {
  name: '图片',
  componentName: 'BaseImage',
  previewImage: require('@/config/images/基本图片.png'),
  componentOption: getBaseOption('BaseImage'),
  componentSetup: _toConsumableArray(getBaseOption('BaseImage', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 200,
    h: 200
  })
}];
exports.text = text;
var base = [{
  name: '模块标题',
  componentName: 'ModuleTitle',
  previewImage: require('@/config/images/模块标题.png'),
  componentOption: getBaseOption('ModuleTitle'),
  componentSetup: _toConsumableArray(getBaseOption('ModuleTitle', true)),
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: 350,
    h: 45
  })
}, {
  name: '视频背景',
  zIndex: 0,
  componentName: 'VideoBg',
  previewImage: require('@/config/images/视频背景.png'),
  componentOption: {
    src: '_common/科技背景-压缩.webm'
  },
  componentSetup: [{
    name: '背景',
    key: 'src',
    type: 'select',
    data: bgList
  }],
  editOption: _objectSpread({}, (0, _modules.componentBaseConfig)(), {
    w: '100%',
    h: '100%',
    y: 0,
    x: 0,
    z: 0,
    resizable: false,
    draggable: false
  })
}];
exports.base = base;

var _default = [].concat(echart, text, base);

exports["default"] = _default;