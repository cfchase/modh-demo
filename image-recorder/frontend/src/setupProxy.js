const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  let port = process.env.BACKEND_DEV_PORT || "8080";
  let apiUrl = `http://0.0.0.0:${port}`;

  app.use(
    '/api',
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
    })
  );
};