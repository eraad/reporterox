var superagent = require('superagent');
var facebookSignedRequest = require('./lib/facebookSignedRequest');
var countdown = require('./lib/countdown.js');
var cons = require('consolidate');
var nconf = require('nconf');
var express = require('express');
var swig = require('swig');
var moment = require('moment');
var app = express();

/**
 * Es necesario validar que app es el objeto adecuado para pasar
 * valores de configuracion al objeto req.
 */
nconf.use('file', { file: './config.json' });
app.set('facebookSecret', nconf.get('facebook:secret'));

app.engine('html', cons.swig);
swig.init({
    root: 'views',
    allowErrors: true
});
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.locals.currentDate = moment().format('D \\de MMMM \\de YYYY');
app.locals.countdown = countdown.countdown();

var URL = "http://services.extra.ec/WsReporteroX/ws/ws.aspx?operation=semana";

var requestApiData = function (url, callback) {
    superagent
        .get(URL)
        .set('Accept', 'application/json')
        .end(function(response) {
            if (response.ok) {
                callback(response.body);
            }
        });
};

var homepage = function(req, res) {
    var signedRequest = req.body.signed_request;
    var facebookSecret = app.get('facebookSecret');
    var decodedSignedRequest = facebookSignedRequest.decode(signedRequest, facebookSecret);
    console.log(decodedSignedRequest);
    var noLikeTemplate = 'no-like.html';
    var likeTemplate = 'like.html';
    requestApiData(URL, function(data) {
        if (decodedSignedRequest.page.liked) {
            res.render(likeTemplate, {
            });
        }
        res.render(noLikeTemplate, {
        });
    });
};

app.post('/', homepage);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Habladme al puerto " + port);
});
