// let some global variables be defined here
var stack = ["Finder"], stack2 = [];
var aboutWindowShowStatus1 = "", isSearchWindowMax = false;
var recentlyUsed = [];  // it a queue to store the recently used applications
var searchWindowMaxStatus = false, aboutWindowMaxStatus = false;
var containerStyle = document.getElementById('container').style;
var topbarStyle = document.getElementById('topbar').style;
var searchWindowShowStatus, aboutWindowShowStatus;
var issearchWindowshow = false;

function showContainer() {
    for(let i = Number(document.getElementById('container').style.bottom.replace("px", "")); i <= 20; i++) {
        setTimeout(() => { document.getElementById('container').style.bottom = String(i)+'px'; }, 200);
    }
}

function hideContainer() {
    for(let i = Number(document.getElementById('container').style.bottom.replace("px", "")); i >= -82; i--) {
        setTimeout(() => { document.getElementById('container').style.bottom = String(i)+'px'; }, 200);
    }
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

// function to control the about window
document.getElementById('about').addEventListener('click', (event) => {
    if(document.getElementById('aboutWindow').style.display === 'block') {
        document.getElementById('minAboutWindow').click();
    } else {
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
        if(aboutWindowShowStatus1 == "max") {
            hideContainer();
        }
    }
});

document.getElementById('closeAboutWindow').addEventListener('click', (event) => {
    stack.pop();
    document.getElementById('aboutWindow').style.display = '';
    document.getElementById('barTitle').innerHTML = 'Finder';
    if(aboutWindowShowStatus1 == "max") {
        document.getElementById('aboutWindow').style.left = '50%';
        document.getElementById('aboutWindow').style.top = '46%';
        document.getElementById('aboutWindow').style.width = '70%';
        document.getElementById('aboutWindow').style.height = '60%';
        document.getElementById('aboutWindow').style.borderRadius = '18px';
        document.getElementById('aboutWindow').style.zIndex = 1;
        showContainer();
    }
    aboutWindowShowStatus1 = "normal";
});

document.getElementById('maxAboutWindow').addEventListener('click', (event) => {
    if(aboutWindowShowStatus1 != "max") {
        document.getElementById('aboutWindow').style.left = '50%';
        document.getElementById('aboutWindow').style.top = '52%';
        document.getElementById('aboutWindow').style.width = '97%';
        document.getElementById('aboutWindow').style.height = '92%';
        document.getElementById('aboutWindow').style.borderRadius = '0';
        document.getElementById('aboutWindow').style.zIndex = 100;
        hideContainer();
        aboutWindowShowStatus1 = "max";
    } else {
        document.getElementById('aboutWindow').style.left = '50%';
        document.getElementById('aboutWindow').style.top = '46%';
        document.getElementById('aboutWindow').style.width = '70%';
        document.getElementById('aboutWindow').style.height = '60%';
        document.getElementById('aboutWindow').style.borderRadius = '18px';
        document.getElementById('aboutWindow').style.zIndex = 1;
        showContainer();
        aboutWindowShowStatus1 = "normal";
    }
});

document.getElementById('minAboutWindow').addEventListener('click', (event) => {
    stack.pop();
    document.getElementById('aboutWindow').style.display = '';
    if(aboutWindowShowStatus1 == "max") {
        showContainer();
    }
    document.getElementById('barTitle').innerHTML = 'Finder';
});

document.getElementById("closeAboutWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("closeAboutWindow").style.background = "#FF5D5B";
    document.getElementById("closeAboutWindow").style.border = "1px solid #CF544D";
});

document.getElementById("closeAboutWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("closeAboutWindow").style.background = "#bababa";
    document.getElementById("closeAboutWindow").style.border = "1px solid #bababa";
});

document.getElementById("maxAboutWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("maxAboutWindow").style.background = "#ffe100";
    document.getElementById("maxAboutWindow").style.border = "1px solid #ffcc00";
});

document.getElementById("maxAboutWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("maxAboutWindow").style.background = "#bababa";
    document.getElementById("maxAboutWindow").style.border = "1px solid #bababa";
});

document.getElementById("minAboutWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("minAboutWindow").style.background = "#0eaf05";
    document.getElementById("minAboutWindow").style.border = "1px solid #00bb51";
});

document.getElementById("minAboutWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("minAboutWindow").style.background = "#bababa";
    document.getElementById("minAboutWindow").style.border = "1px solid #bababa";
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


// function to control the search window
document.getElementById('appleSearch').addEventListener('click', (event) => {
    document.getElementById('searchWindow').style.display = 'block';
    document.getElementById('barTitle').innerHTML = 'Search';
    if(issearchWindowshow) {
        document.getElementById('searchWindow').style.display = '';
        issearchWindowshow = false;
    } else {
        document.getElementById('searchWindow').style.display = 'block';
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
    stack.push('launchpad');
    searchWindowShowStatus = document.getElementById('searchWindow').style.display != 'none' ? document.getElementById('searchWindow').style.display : 'none';
    aboutWindowShowStatus = document.getElementById('aboutWindow').style.display != 'none' ? document.getElementById('aboutWindow').style.display : 'none';
    document.getElementById('applications').style.display = 'block';
    document.getElementById('topbar').style.display = 'none';
    document.getElementById('container').style.display = 'none';
    document.getElementById('searchWindow').style.display = '';
    document.getElementById('aboutWindow').style.display = '';
});

// function to control the applications
document.getElementById('applications').addEventListener('mousedown', function() {
    setTimeout(() => {
        document.getElementById('applications').style.display = '';
        document.getElementById('topbar').style = topbarStyle;
        document.getElementById('container').style = containerStyle;
        document.getElementById('searchWindow').style.display = searchWindowShowStatus;
        document.getElementById('aboutWindow').style.display = aboutWindowShowStatus;
        stack.pop();
    }, 100);
});