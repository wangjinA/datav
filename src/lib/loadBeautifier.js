import loadScript from './loadScript'

let beautifierObj

export default function loadBeautifier(cb) {
  if (beautifierObj) {
    cb(beautifierObj)
    return
  }

  loadScript('https://lib.baomitu.com/js-beautify/1.10.2/beautifier.min.js', () => {
    // eslint-disable-next-line no-undef
    beautifierObj = beautifier
    console.log(beautifierObj);
    cb(beautifierObj)
  })
}
