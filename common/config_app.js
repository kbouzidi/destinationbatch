/**
 * Created by khalil on 02/12/15.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    errorhandler = require('errorhandler');

module.exports = function (app, config) {
    app.use(compression());
    app.use(morgan('dev'));
    app.use(cookieParser(config.cookie_secret));
    app.use(methodOverride());
    app.use(express.static(__dirname + '/../public/'));

    app.all("/api/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With, Accept");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, HEAD, DELETE, OPTIONS");
        return next();
    });

    app.use(errorhandler({
        dumpExceptions: true,
        showStack: true
    }));

};