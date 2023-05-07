const ROUTES = [
    {
        url: '/api/auth/',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:10001/",
            changeOrigin: true,
        }
    },
    {
        url: '/api/company/',
        auth: false,
        creditCheck: false,
        proxy: {
            target: "http://localhost:10002/",
            changeOrigin: true,
        }
    },
]

module.exports = ROUTES;