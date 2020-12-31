import { loadScriptQueue } from './loadScript'
import { Message } from 'view-design'

// monaco-editor单例
let monacoEidtor

/**
 * 动态加载monaco-editor cdn资源
 * @param {Function} cb 回调，必填
 */
export default function loadMonaco(cb) {
  if (monacoEidtor) {
    cb(monacoEidtor)
    return
  }

  const vs = 'https://lib.baomitu.com/monaco-editor/0.19.3/min/vs'

  // 使用element ui实现加载提示
  Message.loading({
    content: '资源加载中',
    duration: 0
  });

  !window.require && (window.require = {})
  !window.require.paths && (window.require.paths = {})
  window.require.paths.vs = vs

  loadScriptQueue([
    `${vs}/loader.js`,
    `${vs}/editor/editor.main.nls.js`,
    `${vs}/editor/editor.main.js`
  ], () => {
    // eslint-disable-next-line no-undef
    checkMonaco((monaco) => {
      Message.destroy()
      monacoEidtor = monaco
      cb(monacoEidtor)
    })
  })
}


function checkMonaco(cb) {
  if (window.monaco) {
    cb(window.monaco)
  } else {
    setTimeout(() => {
      checkMonaco(cb)
    }, 200);
  }
}