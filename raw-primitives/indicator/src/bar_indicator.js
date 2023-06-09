function scaleToLimits(value, limits){
    return value / (limits[1] - limits[0]) * 15;
};

let DEFAULT_SYMBOL = "■";
function indicator5(real) {
    let lims = {'green':5,'yellow':5,'red':5,'black':2};
    indicator = "";
    res = real;
    for (const color in lims) {
        let lim = lims[color];
        //console.log(lim, color);
        if (res > lim) {
            indicator += '<span style="color:' + color + '"><b>' + DEFAULT_SYMBOL.repeat(lim) + '</b></span>';
            //indicator.push(lim);
            res -= lim;
        } else {
            indicator += '<span style="color:' + color + '"><b>' + DEFAULT_SYMBOL.repeat(res) + '</b></span>';
            return indicator;
        }
    }
    return indicator;
};

let P = this.inPort1['P'];
let Pnum = Number(P).toFixed(1);

indicator5(scaleToLimits(Pnum, this.P_lim))