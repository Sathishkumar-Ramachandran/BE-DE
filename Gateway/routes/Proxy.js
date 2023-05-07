const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, routes) => {
    routes.map(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

module.exports=setupProxies;  