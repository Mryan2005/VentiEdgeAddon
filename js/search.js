document.getElementById('searchBtn').addEventListener('click', (event) => {
    var searchEngine = document.getElementById('searchEngine').value;
    var searchWord = document.getElementById('searchWord').value;
    if(searchEngine === 'google') {
        var searchUrl = 'https://www.google.com/search?q=';
    } else if(searchEngine === 'bing') {
        var searchUrl = 'https://www.bing.com/search?q=';
    } else if(searchEngine === 'baidu') {
        var searchUrl = 'https://www.baidu.com/s?wd=';
    }
    var searchUrl = searchUrl + searchWord;
    window.open(searchUrl, '_blank');
});

// press enter to search
document.getElementById('searchWord').addEventListener('keypress', function(event) {
    if(event.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

