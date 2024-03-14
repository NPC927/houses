var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    var day = dt.getDate();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    var mtr = mt < 10 ? '0' + mt : mt;
    var dayr = day < 10 ? '0' + day : day;
    var hr = h < 10 ? '0' + h : h;
    var mr = m < 10 ? '0' + m : m;
    var sr = s < 10 ? '0' + s : s;
    document.getElementById("showTime").innerHTML = y + "年" + mtr + "月" + dayr + "日 " + hr + "时" + mr + "分" + sr +
        "秒";
    t = setTimeout(time, 1000);
}