var S = require('string');

exports.truncate = function (input, chars) {
    return S(input).truncate(chars);
};
