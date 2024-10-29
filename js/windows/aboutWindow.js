// function to control the about window
document.getElementById('about').addEventListener('click', (event) => {
    if(issearchWindowshow) {
        hideSearchWindow();
        issearchWindowshow = false;
    }
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
    if(issearchWindowshow) {
        hideSearchWindow();
        issearchWindowshow = false;
    }
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
    if(issearchWindowshow) {
        hideSearchWindow();
        issearchWindowshow = false;
    }
    if(aboutWindowShowStatus1 != "max") {
        document.getElementById('aboutWindow').style.width = document.body.offsetWidth+"px";
        document.getElementById('aboutWindow').style.height = $(window).height()-30+"px";
        var aboutWindowsSize1 = document.getElementById('aboutWindow');
        var w = aboutWindowsSize1.offsetWidth/2;
        var h = aboutWindowsSize1.offsetHeight/2;
        document.getElementById('aboutWindow').style.left = w+"px";
        document.getElementById('aboutWindow').style.top = h+30+"px";
        document.getElementById('aboutWindow').style.borderRadius = '0';
        document.getElementById('aboutWindow').style.zIndex = 100;
        document.getElementById('aboutWindow').style.background = "#ffffff80";
        hideContainer();
        aboutWindowShowStatus1 = "max";
    } else {
        document.getElementById('aboutWindow').style.position = 'fixed';
        document.getElementById('aboutWindow').style.left = '50%';
        document.getElementById('aboutWindow').style.top = '46%';
        document.getElementById('aboutWindow').style.width = '70%';
        document.getElementById('aboutWindow').style.height = '60%';
        document.getElementById('aboutWindow').style.borderRadius = '18px';
        document.getElementById('aboutWindow').style.zIndex = 1;
        document.getElementById('aboutWindow').style.background = "rgba(255, 255, 255, 0.24)";
        showContainer();
        aboutWindowShowStatus1 = "normal";
    }
});

document.getElementById('minAboutWindow').addEventListener('click', (event) => {
    stack.pop();
    if(document.getElementById('searchWindow').style.display === 'block') {
        document.getElementById('searchWindow').style.display = '';
    }
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