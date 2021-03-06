var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

function createApi() {
    var api = express();

    api.use(bodyParser.json());

    var routesPath = path.join(__dirname, '../routes');
    fs.readdirSync(routesPath).forEach(function (file) {
        if (/(.*)\.(js$|coffee$)/.test(file)) {
            require(routesPath + '/' + file)(api);
        }
    });

    api.all('*', function(req, res) {
        res.send(404);
    });

    return api;
}

module.exports = function(app) {
    app.use(createApi());
};
