var express = require('express');
var app = express();
var superagent = require('superagent');

app.get('/', function(req, res){
    var URL = "http://services.extra.ec/WsReporteroX/ws/ws.aspx?operation=semana";
    superagent
        .get(URL)
        .end(function(data) {
            res.send(data);
        });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Escucho en el puerto" + port);
});