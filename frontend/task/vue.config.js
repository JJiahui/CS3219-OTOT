module.exports = {
  devServer: {
    // proxy: 'http://localhost:9090'
    proxy: {
      // "^/api/": {
      "api/": {
        target: "http://localhost:9090",
        // pathRewrite: { "^/api/": "/api/" },
        // changeOrigin: true,
        // logLevel: "debug"
      },
      "/.netlify/functions": {
        "target": "http://localhost:9000",
        "pathRewrite": {
          "^/\\.netlify/functions": ""
        }
      }
    }
  }
}