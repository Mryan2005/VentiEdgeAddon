var stack = ["Finder"], stack2 = [];
var containerStyle = document.getElementById('container').style;
var topbarStyle = document.getElementById('topbar').style;
var searchWindowShowStatus, aboutWindowShowStatus;

function renewZIndex(elem, i) {
    switch(elem) {
        case 'Search':
            document.getElementById('searchWindow').style.zIndex = i;
            break;
        case 'About':
            document.getElementById('aboutWindow').style.zIndex = i;
            break;
    }
}

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

document.getElementById('about').addEventListener('click', (event) => {
    if(stack[stack.length - 1] === 'About') {
        return;
    } else if(document.getElementById('aboutWindow').style.display === 'block') {
        stack2.push('About');
        for(let i = stack.length-1; i > 0; --i) {
            if(stack[i] === 'About') {
                stack.pop();
                continue;
            }
            stack2.push(stack[i]);
            stack.pop();
        }
        for(let i = 0; stack2.length > 0; i++) {
            stack.push(stack2[stack2.length-1]);
            renewZIndex(stack2[stack2.length-1], i+1);
            stack2.pop();
        }
    } else if(document.getElementById('aboutWindow').style.display === "") {
        document.getElementById('aboutWindow').style.display = 'block';
        stack.push('About');
    }
    document.getElementById('barTitle').innerHTML = 'About';
});

document.getElementById('closeAboutWindow').addEventListener('click', (event) => {
    stack.pop();
    document.getElementById('aboutWindow').style.display = '';
    document.getElementById('barTitle').innerHTML = 'Finder';
});

document.getElementById('closeSearchWindow').addEventListener('click', (event) => {
    stack.pop();
    document.getElementById('searchWindow').style.display = '';
    document.getElementById('barTitle').innerHTML = 'Finder';
});

document.getElementById('appleSearch').addEventListener('click', (event) => {
    if(stack[stack.length - 1] === 'Search') {
        return;
    } else if(document.getElementById('searchWindow').style.display === 'block') {
        stack2.push('Search');
        for(let i = stack.length-1; i > 0; --i) {
            if(stack[i] === 'Search') {
                stack.pop();
                continue;
            }
            stack2.push(stack[i]);
            stack.pop();
        }
        for(let i = 0; stack2.length > 0; i++) {
            stack.push(stack2[stack2.length-1]);
            renewZIndex(stack2[stack2.length-1], i+1);
            stack2.pop();
        }
    } else if(document.getElementById('searchWindow').style.display === "") {
        document.getElementById('searchWindow').style.display = 'block';
        stack.push('Search');
    }
    document.getElementById('barTitle').innerHTML = 'Search';
});

document.getElementById('launchpad').addEventListener('click', (event) => {
    stack.push('launchpad');
    searchWindowShowStatus = document.getElementById('searchWindow').style.display != 'none' ? document.getElementById('searchWindow').style.display : 'none';
    aboutWindowShowStatus = document.getElementById('aboutWindow').style.display != 'none' ? document.getElementById('aboutWindow').style.display : 'none';
    document.getElementById('applications').style.display = 'block';
    document.getElementById('topbar').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    document.getElementById('searchWindow').style.display = '';
    document.getElementById('aboutWindow').style.display = '';
});

document.addEventListener('DOMContentLoaded', (event) => {
    navigator.keyboard.lock(['Escape']);
    document.addEventListener('keydown', function(e) {
        // console.log(`键名: ${e.key}, 键码: ${e.code}`);
        if(e.key === 'Escape' && stack.length > 0) {
            if(stack[stack.length - 1] === 'About') {
                document.getElementById('aboutWindow').style.display = '';
                stack.pop();
            } else if(stack[stack.length - 1] === 'Search') {
                document.getElementById('searchWindow').style.display = '';
                stack.pop();
            } else if(stack[stack.length - 1] === 'launchpad') {
                document.getElementById('applications').style.display = '';
                document.getElementById('topbar').style = topbarStyle;
                document.getElementById('container').style = containerStyle;
                document.getElementById('searchWindow').style.display = searchWindowShowStatus;
                document.getElementById('aboutWindow').style.display = aboutWindowShowStatus;
                stack.pop();
            } else if(stack[stack.length - 1] === 'Finder') {
                return;
            }
            document.getElementById('barTitle').innerHTML = stack[stack.length - 1];
        }
    });
});

document.getElementById('aboutWindowHeader').addEventListener('mousedown', function() {
    document.getElementById('aboutWindowHeader').addEventListener('mousemove', function(e) {
        var x = e.clientX;
        var y = e.clientY;
        document.getElementById('aboutWindowHeader').style.left = x + 'px';
        document.getElementById('aboutWindowHeader').style.top = y + 'px';
    });
    document.getElementById('aboutWindowHeader').addEventListener('mouseup', function() {
        document.getElementById('aboutWindowHeader').removeEventListener('mousemove', function(e) {
            var x = e.clientX;
            var y = e.clientY;
            document.getElementById('aboutWindowHeader').style.left = x + 'px';
            document.getElementById('aboutWindowHeader').style.top = y + 'px';
        });
    });
});

document.getElementById('applications').addEventListener('mousedown', function() {
    document.getElementById('applications').style.display = '';
    document.getElementById('topbar').style = topbarStyle;
    document.getElementById('container').style = containerStyle;
    document.getElementById('searchWindow').style.display = searchWindowShowStatus;
    document.getElementById('aboutWindow').style.display = aboutWindowShowStatus;
    stack.pop();
});