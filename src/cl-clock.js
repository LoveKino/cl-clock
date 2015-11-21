module.exports = (handler, interval = 500) => {
    let last = null;

    let tick = () => {
        let now = parseInt(new Date().getTime() / 1000);
        let sTimes = timeInterval(now, last);
        last = now;
        for (let i = 0; i < sTimes.length; i++) {
            let name = getEventName(sTimes[i]);
            handler && handler(name, sTimes[i]);
        }
        //
        setTimeout(tick, interval);
    }

    let timeInterval = (now, last) => {
        let sTimes = [];
        if (last) {
            let seconds = now - last;
            for (let i = 0; i < seconds; i++) {
                sTimes.push(last + i + 1);
            }
        } else {
            sTimes.push(now);
        }
        return sTimes;
    }

    tick();
}

let getEventName = (sTime) => {
    let dDate = new Date(sTime * 1000);
    let hours = dDate.getHours();
    let minutes = dDate.getMinutes();
    let seconds = dDate.getSeconds();

    return hours + "-" + minutes + "-" + seconds;
}