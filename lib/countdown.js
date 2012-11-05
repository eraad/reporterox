var moment = require('moment');

exports.countdown = function countdown() {
    var now = moment();
    var deadline = moment([2012, 11, 10]);
    var ms = deadline.diff(now, 'milliseconds', true);
    var months = Math.floor(moment.duration(ms).asMonths());
    deadline = deadline.subtract('months', months);
    ms = deadline.diff(now, 'milliseconds', true);
    var days = Math.floor(moment.duration(ms).asDays());
    deadline = deadline.subtract('days', days);
    ms = deadline.diff(now, 'milliseconds', true);
    var hours = Math.floor(moment.duration(ms).asHours());
    deadline = deadline.subtract('hours', hours);
    ms = deadline.diff(now, 'milliseconds', true);
    minutes = Math.floor(moment.duration(ms).asMinutes());
    ms = deadline.diff(now, 'milliseconds', true);
    seconds = Math.floor(moment.duration(ms).asSeconds());
    return { days: days, hours: hours, minutes: minutes};
};
