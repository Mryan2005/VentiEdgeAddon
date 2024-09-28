const Http = new XMLHttpRequest();
const url='https://ventiEdgeAddon.Mryan2005.top/version.json';
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
}