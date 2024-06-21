/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target:
        "http://ec2-52-79-135-148.ap-northeast-2.compute.amazonaws.com:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when forwarding to the target server
      },
    })
  )
}
