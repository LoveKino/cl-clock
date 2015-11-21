"use strict";

module.exports = function (handler) {
    var interval = arguments.length <= 1 || arguments[1] === undefined ? 500 : arguments[1];

    var last = null;

    var tick = function tick() {
        var now = parseInt(new Date().getTime() / 1000);
        var sTimes = timeInterval(now, last);
        last = now;
        for (var i = 0; i < sTimes.length; i++) {
            var name = getEventName(sTimes[i]);
            handler && handler(name, sTimes[i]);
        }
        //
        setTimeout(tick, interval);
    };

    var timeInterval = function timeInterval(now, last) {
        var sTimes = [];
        if (last) {
            var seconds = now - last;
            for (var i = 0; i < seconds; i++) {
                sTimes.push(last + i + 1);
            }
        } else {
            sTimes.push(now);
        }
        return sTimes;
    };

    tick();
};

var getEventName = function getEventName(sTime) {
    var dDate = new Date(sTime * 1000);
    var hours = dDate.getHours();
    var minutes = dDate.getMinutes();
    var seconds = dDate.getSeconds();

    return hours + "-" + minutes + "-" + seconds;
};