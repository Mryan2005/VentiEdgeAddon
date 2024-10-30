window.onload = function () {
    // sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    sleep(1000);
}
// include js files

// import { fadeIn } from './jquery-3.7.1.min.js';

// let some global variables be defined here
var stack = ["Finder"], stack2 = [], dqueue = [], dqueue2 = [];
var aboutWindowShowStatus1 = "", isSearchWindowMax = false;
var recentlyUsed = [];  // it a queue to store the recently used applications
var searchWindowMaxStatus = false, aboutWindowMaxStatus = false;
var containerStyle = document.getElementById('container').style;
var topbarStyle = document.getElementById('topbar').style;
var searchWindowShowStatus, aboutWindowShowStatus;
var issearchWindowshow = false;

let screenWidth = window.screen.width;
let screenHeight = window.screen.height;

function showSearchWindow() {
    $("#searchWindow").fadeIn(200);
}

function hideSearchWindow() {
    $("#searchWindow").fadeOut(100);
}

function showContainer() {
    $("#container").animate({bottom:'20px'}, 50);
    // for(let i = Number(document.getElementById('container').style.bottom.replace("px", "")); i <= 20; i++) {
    //     setTimeout(() => { document.getElementById('container').style.bottom = String(i)+'px'; }, 200);
    // }
}

function hideContainer() {
    $("#container").animate({bottom:'-82px'}, 50);
    // for(let i = Number(document.getElementById('container').style.bottom.replace("px", "")); i >= -82; i--) {
    //     setTimeout(() => { document.getElementById('container').style.bottom = String(i)+'px'; }, 200);
    // }
}

function pushBack(dque,url, icon) {
    dque.push({url: url, icon: icon});
}

function popFront(dque) {
    var elem = dque[0];
    dque.shift();
    return elem;
}

function front(dequeue) {
    return dequeue[0];
}

function back(dequeue) {
    return dequeue[dequeue.length-1];
}

// function to renew the z-index of the window
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

// function to request full screen
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

// DOMContentLoaded event
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("closeAboutWindow").style.background = "#bababa";
    document.getElementById("closeAboutWindow").style.border = "1px solid #bababa";
    document.getElementById("maxAboutWindow").style.background = "#bababa";
    document.getElementById("maxAboutWindow").style.border = "1px solid #bababa";
    document.getElementById("minAboutWindow").style.background = "#bababa";
    document.getElementById("minAboutWindow").style.border = "1px solid #bababa";
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

// function to get the time and show it on the top bar
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

// function to control the search window
document.getElementById('appleSearch').addEventListener('click', (event) => {
    showSearchWindow();
    document.getElementById('barTitle').innerHTML = 'Search';
    if(issearchWindowshow) {
        hideSearchWindow();
        issearchWindowshow = false;
    } else {
        showSearchWindow();
        issearchWindowshow = true;
    }
});

document.getElementById('searchButton').addEventListener('click', (event) => {
    var searchEngine = document.getElementById('searchEngine').value;
    var searchWord = document.getElementById('searchInput').value;
    if(searchEngine === 'google') {
        var searchUrl = 'https://www.google.com/search?q=';
    } else if(searchEngine === 'bing') {
        var searchUrl = 'https://www.bing.com/search?q=';
    } else if(searchEngine === 'baidu') {
        var searchUrl = 'https://www.baidu.com/s?wd=';
    } else if(searchEngine === 'bilibili') {
        var searchUrl = 'https://search.bilibili.com/all?keyword=';
    }
    var searchUrl = searchUrl + searchWord;
    window.open(searchUrl, '_blank');
});

// press enter to search
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        document.getElementById('searchButton').click();
    }
});



// function to control the launchpad
document.getElementById('launchpad').addEventListener('click', (event) => {
    hideContainer();
    stack.push('launchpad');
    if(issearchWindowshow) {
        hideSearchWindow();
        issearchWindowshow = false;
    }
    aboutWindowShowStatus = document.getElementById('aboutWindow').style.display != 'none' ? document.getElementById('aboutWindow').style.display : 'none';
    $('#applications').fadeIn(50);
    document.getElementById('topbar').style.display = 'none';
    document.getElementById('searchWindow').style.display = '';
    document.getElementById('aboutWindow').style.display = '';
});

// function to control the applications
document.getElementById('applications').addEventListener('mousedown', function() {
    $('#applications').fadeOut(50);
    document.getElementById('topbar').style = topbarStyle;
    showContainer();
    document.getElementById('searchWindow').style.display = searchWindowShowStatus;
    document.getElementById('aboutWindow').style.display = aboutWindowShowStatus;
    stack.pop();
});

document.write("<script src='./js/windows/aboutWindow.js'></script>");

pushBack(dqueue, 'http://openjudge.cn/', 'icons/oj.png');
pushBack(dqueue, 'https://oldhome.sspu.edu.cn/', 'icons/SSPU.png');
pushBack(dqueue, 'https://www.bilibili.com/', 'icons/bilibili.png');

document.getElementById('container11').innerHTML = "<a href='"+dqueue[2].url+"'><img src='"+dqueue[2].icon+".png' alt='icon'></a>";
document.getElementById('container10').innerHTML = "<a href='"+dqueue[1].url+"'><img src='"+dqueue[1].icon+".png' alt='icon'></a>";
document.getElementById('container9').innerHTML = "<a href='"+dqueue[0].url+"'><img src='"+dqueue[0].icon+".png' alt='icon'></a>";