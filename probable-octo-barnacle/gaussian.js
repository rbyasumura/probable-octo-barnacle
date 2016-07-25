var spare;
var isSpareReady = false;

function getGaussian(mean, stdDev) {
    if (isSpareReady) {
        isSpareReady = false;
        return spare * stdDev + mean;
    } else {
        var u, v, s = 0;
        for (; s >= 1 || s == 0;) {
            u = Math.random() * 2 - 1;
            v = Math.random() * 2 - 1;
            s = u * u + v * v;
        }
        var mul = Math.sqrt(-2 * Math.log(s) / s);
        spare = v * mul;
        isSpareReady = true;
        return mean + stdDev * u * mul;
    }
}
