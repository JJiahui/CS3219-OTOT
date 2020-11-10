module.exports = {
  devServer: {
    proxy: 'http://localhost:9090'
    // proxy: {
    //   "^/api/": {
    //     target: "http://localhost:9090",
    //     pathRewrite: { "^/api/": "/api/" },
    //     changeOrigin: true,
    //     logLevel: "debug"
    //   }
    // }
  }
}