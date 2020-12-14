
module.exports = {
  // lintOnSave: true
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:7001',
        target: 'http://47.96.254.128:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}