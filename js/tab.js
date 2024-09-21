document.getElementById('body1').addEventListener('click', (event) => {
    const element = document.documentElement; // 获取整个文档的元素
    if (element.requestFullscreen) { // 标准写法
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox 浏览器
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome 和 Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE11
        element.msRequestFullscreen();
    }
});

function getTime() {
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    if(month < 10) {
        month = '0' + month;
    }
    if(date < 10) {
        date = '0' + date;
    }
    if(hour < 10) {
        hour = '0' + hour;
    }
    if(minute < 10) {
        minute = '0' + minute;
    }
    if(second < 10) {
        second = '0' + second;
    }
    var timeString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
    document.getElementById('appleTime').innerHTML = timeString;
}

// document.getElementById('appleTime').addEventListener('click', (event) => {
//     document.getElementById('appleTime').innerHTML = 'Apple';
// });

window.addEventListener('load', (event) => {
    getTime();
    setInterval(getTime, 1000);
});