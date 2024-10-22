/** @format */

const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://d1vekwkrzd8nzj.cloudfront.net/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // remove /api prefix when forwarding to the target server
      },
    })
  );
}
