// let some global variables be defined here
var stack = ["Finder"], stack2 = [];
var searchWindowMaxStatus = false, aboutWindowMaxStatus = false;
var containerStyle = document.getElementById('container').style;
var topbarStyle = document.getElementById('topbar').style;
var searchWindowShowStatus, aboutWindowShowStatus;

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
    document.getElementById("closeSearchWindow").style.background = "#bababa";
    document.getElementById("closeSearchWindow").style.border = "1px solid #bababa";
    document.getElementById("maxAboutWindow").style.background = "#bababa";
    document.getElementById("maxAboutWindow").style.border = "1px solid #bababa";
    document.getElementById("maxSearchWindow").style.background = "#bababa";
    document.getElementById("maxSearchWindow").style.border = "1px solid #bababa";
    document.getElementById("minSearchWindow").style.background = "#bababa";
    document.getElementById("minSearchWindow").style.border = "1px solid #bababa";
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

document.getElementById("closeSearchWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("closeSearchWindow").style.background = "#FF5D5B";
    document.getElementById("closeSearchWindow").style.border = "1px solid #CF544D";
});
document.getElementById("closeSearchWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("closeSearchWindow").style.background = "#bababa";
    document.getElementById("closeSearchWindow").style.border = "1px solid #bababa";
});


document.getElementById("maxSearchWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("maxSearchWindow").style.background = "#ffe100";
    document.getElementById("maxSearchWindow").style.border = "1px solid #ffcc00";
});
document.getElementById("maxSearchWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("maxSearchWindow").style.background = "#bababa";
    document.getElementById("maxSearchWindow").style.border = "1px solid #bababa";
});
document.getElementById("maxSearchWindow").addEventListener("click", (event) => {
    if(searchWindowMaxStatus) {
        searchWindowMaxStatus = false;
        document.getElementById("searchWindow").style.left = "50%";
        document.getElementById("searchWindow").style.top = "50%";
        document.getElementById("searchWindow").style.width = "70%";
        document.getElementById("searchWindow").style.height = "60%";
        document.getElementById("searchWindow").style.alignContent = "";
        document.getElementById("searchWindow").style.position = "fixed";
        document.getElementById("searchWindow").style.border = "1px solid #ccc";
        document.getElementById("searchWindow").style.borderRadius = "10px";
    } else {
        searchWindowMaxStatus = true;
        document.getElementById("searchWindow").style.width = innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
        document.getElementById("searchWindow").style.height = innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
        document.getElementById("searchWindow").style.border = "none";
        document.getElementById("searchWindow").style.borderRadius = "0";
        document.getElementById("searchWindow").style.position = "absolute";
        document.getElementById("searchWindow").style.alignContent = "";
        document.getElementById("searchWindow").style.top = "52%";
        document.getElementById("searchWindow").style.left = "";
    }
});


document.getElementById("minSearchWindow").addEventListener("mouseenter", (event) => {
    document.getElementById("minSearchWindow").style.background = "#0eaf05";
    document.getElementById("minSearchWindow").style.border = "1px solid #00bb51";
});
document.getElementById("minSearchWindow").addEventListener("mouseleave", (event) => {
    document.getElementById("minSearchWindow").style.background = "#bababa";
    document.getElementById("minSearchWindow").style.border = "1px solid #bababa";
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