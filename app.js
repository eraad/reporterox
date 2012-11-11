var superagent = require('superagent');
var facebookSignedRequest = require('./lib/facebookSignedRequest');
var countdown = require('./lib/countdown.js');
var cons = require('consolidate');
var config = require('./config');
var express = require('express');
var swig = require('swig');
var moment = require('moment');
var async = require('async');
var app = express();

// all environments
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.engine('html', cons.swig);
swig.init({
    root: 'views',
    allowErrors: true,
    filters: require('./myfilters')
});

// development only
app.configure('development', function(){
    app.set('facebookSecret', config.config.facebookDev.secret);
});

// production only
app.configure('production', function(){
    app.set('facebookSecret', config.config.facebook.secret);
});

app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.locals.currentDate = moment().format('D \\de MMMM \\de YYYY');
app.locals.urlMicrositio = config.config.links.urlMicrositio;

var requestApiData = function (url, query, callback) {
    var apiRequest = superagent
            .get(url)
            .set('Accept', 'application/json');

    async.forEach(query, function(item, callback){
        apiRequest.query(item);
    }, function(err) {
        if (err) {
            console.log(err);
        }
    });

    apiRequest.end(function(response) {
        if (response.ok) {
            callback(response.body);
        }
    });
};

var fechaConcurso = function(req, res, next) {
    var url = config.config.webServices.proximoConcurso.url;
    requestApiData(url, [], function(response){
        if (response) {
            req.fechaConcurso = response.RESPUESTA[0];
            next();
        }
    });
};

var middleware = [fechaConcurso];

var homepage = function(req, res) {
    var signedRequest = req.body.signed_request;
    var facebookSecret = app.get('facebookSecret');
    var decodedSignedRequest = facebookSignedRequest.decode(signedRequest, facebookSecret);
    var noLikeTemplate = 'no-like.html';
    var likeTemplate = 'like.html';

    var url = config.config.webServices.fotosPortada.url;
    var params = config.config.webServices.fotosPortada.params;
    requestApiData(url, params, function(data) {
        if (decodedSignedRequest.page.liked) {
            res.render(likeTemplate, {
                fotosPortada: data.RESPUESTA,
                fechaConcurso: req.fechaConcurso
            });
        }
        res.render(noLikeTemplate, {
        });
    });
};

var homepageGet = function(req, res) {
    var likeTemplate = 'like.html';
    var url = config.config.webServices.fotosPortada.url;
    var params = config.config.webServices.fotosPortada.params;
    requestApiData(url, params, function(data) {
        res.render(likeTemplate, {
            fotosPortada: data.RESPUESTA,
            fechaConcurso: req.fechaConcurso
        });
    });
};

var masleidas = function(req, res) {
    var url = config.config.webServices.MasPopulares.url;
    var params = config.config.webServices.MasPopulares.params;
    requestApiData(url, params, function(data) {
        res.render('masleidas.html', {
            masPopulares: data.RESPUESTA,
            fechaConcurso: req.fechaConcurso
        });
    });
};

var ganadores = function(req, res) {
    res.render('ganadores.html', {
        fechaConcurso: req.fechaConcurso
    });
};

var masnoticias = function(req, res) {
    var url = config.config.webServices.NoticiasPorPagina.url;
    var params = config.config.webServices.NoticiasPorPagina.params;
    if (req.query.page) {
        params.page = req.query.page;
    }
    requestApiData(url, params, function(data) {
        res.render('masnoticias.html', {
            masPopulares: data.RESPUESTA,
            fechaConcurso: req.fechaConcurso
        });
    });
};

var noticia = function(req, res) {
    var url = config.config.webServices.NoticiasPorId.url;
    var params = config.config.webServices.NoticiasPorId.params;
    console.log(url);
    if (req.query.id) {
        params[1].ID= req.query.id;
    }
    console.log(params);
    requestApiData(url, params, function(data) {
        res.render('noticia.html', {
            noticia: data.RESPUESTA[0],
            fechaConcurso: req.fechaConcurso
        });
        console.log(data);
    });
    console.log(req.query.id);
};

var appInstalled = function(req, res) {
    res.render('appinstalled.html', {
        profileUrl: config.config.facebook.profileUrl,
        appName: config.config.name
    });
}

app.post('/', middleware, homepage);
app.get('/', middleware, homepageGet);
app.get('/masleidas', middleware, masleidas);
app.get('/masnoticias', middleware, masnoticias);
app.get('/ganadores', middleware, ganadores);
app.get('/noticia', middleware, noticia);
app.get('/appinstalled', appInstalled);

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Habladme al puerto " + port);
});
