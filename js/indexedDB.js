const request = window.indexedDB.open("root", 3);
var db;
request.onerror = (event) => {
    // 处理错误！
    alert("无法使用 IndexedDB！"); 
};

request.onsuccess = (event) => {
    var db = event.target.result;
    console.log("indexedDB run success!");
};

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    //objectStore = db.createObjectStore('person', { keyPath: 'id' });
    // 创建对象存储（表），设置主键为 'id'
    var infoObjectStore = db.createObjectStore('info', { keyPath: 'objectName' });
    var objectStore = db.createObjectStore('settings', { keyPath: 'settingName' });
    // 为 'name' 字段创建索引
    infoObjectStore.createIndex('objectName', 'objectName', { unique: false });
    infoObjectStore.put({ objectName: "addonVersion", content: "0.0.1" });
    infoObjectStore.put({ objectName: "indexedDBVersion", content: "3.0.0" });
}