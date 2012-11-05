var base64 = require('./base64.js');
var crypto = require('crypto');

exports.decode = function(signed_request, secret) {
    var encoded_data = signed_request.split('.', 2);
    var sig = encoded_data[0];
    var json = base64.decode(encoded_data[1]);
    var data = JSON.parse(json); // ERROR Occurs Here!

    if (!data.algorithm || data.algorithm.toUpperCase() != 'HMAC-SHA256') {
        console.error('Unknown algorithm. Expected HMAC-SHA256');
        return null;
    }

    expected_sig = crypto.createHmac('sha256',secret).update(encoded_data[1]).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace('=','');
    if (sig !== expected_sig) {
        console.error('Bad signed JSON Signature!');
        return null;
    }

    return data;
};
