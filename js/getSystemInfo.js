import {putData, request} from './indexedDB.js'

const navigatorObject = window.navigator.getBattery();
console.log(navigatorObject);
putData('battery', navigatorObject);