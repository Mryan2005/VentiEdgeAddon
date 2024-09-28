const Http = new XMLHttpRequest();
const url='https://ventiEdgeAddon.Mryan2005.top/version.json';
Http.open("GET", url);
Http.send();
var urlLocal = 'version.json';
var HttpLocal = new XMLHttpRequest();
HttpLocal.open("GET", urlLocal);
HttpLocal.send();

Http.onreadystatechange = (e) => {
    if(e.target.readyState === 4) {
        var data = JSON.parse(Http.responseText);
        var version = data.version;
        var downloadUrl = data.downloadUrl;
        var updateInfo = data.updateInfo;
        var localData = JSON.parse(HttpLocal.responseText);
        var localVersion = localData.version;
        console.log('localVersion: ' + localVersion);
        if(!(version === localVersion)) {
            var update = confirm('New version detected! Do you want to update?\n' + updateInfo);
            if(update) {
                window.open(downloadUrl, '_blank');
            } else {
                alert('You can update later in the settings.');
            }
        }
    }
}