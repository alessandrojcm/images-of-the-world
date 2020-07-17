const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/locales', {
            target: 'http://localhost:12345',
        })
    );
};
