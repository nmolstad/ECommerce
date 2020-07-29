const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require("axios");

module.exports = function(app) {
    app.use(
        '/zuul',
        createProxyMiddleware({
            target: `http://localhost:7080`,
            changeOrigin: true,
        })
    );

    app.use(
        '/user-repository',
        createProxyMiddleware({
            target: `http://localhost:7080`,
            changeOrigin: true,
        })
    );

    // app.use(
    //     '/item',
    //     createProxyMiddleware({
    //         target: `http://${process.env.REACT_APP_ITEM_SERVICE_HOST}:${process.env.REACT_APP_ITEM_SERVICE_PORT}`,
    //         changeOrigin: true,
    //     })
    // );
    //
    // app.use(
    //     '/cart',
    //     createProxyMiddleware({
    //         target: `http://${process.env.REACT_APP_CART_SERVICE_HOST}:${process.env.REACT_APP_CART_SERVICE_PORT}`,
    //         changeOrigin: true,
    //     })
    // );
    // app.use(
    //     '/checkout',
    //     createProxyMiddleware({
    //         target: `http://${process.env.REACT_APP_CHECKOUT_SERVICE_HOST}:${process.env.REACT_APP_CHECKOUT_SERVICE_PORT}`,
    //         changeOrigin: true,
    //     })
    // );
};