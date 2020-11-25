const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  let apiUrl = process.env.API_URL || "http://0.0.0.0:8080";

  app.use(
    '/api',
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
    })
  );
};