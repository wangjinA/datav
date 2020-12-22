/*
 * @Author: 汪锦
 * @Date: 2020-12-21 15:29:29
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-12-21 16:52:28
 * @Description: IndexedDB数据库操作
 */


const DB_NAME = 'datav'
const DB_VERSION = 1
let request = window.indexedDB.open(DB_NAME, DB_VERSION);
let db;
const storeName = 'option'
request.onupgradeneeded = function (event) {
  db = event.target.result;
  let objectStore = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('value', 'value', { unique: false });
  console.log('数据库创建成功，版本：' + DB_VERSION);
}
request.onsuccess = function () {
  db = request.result;
  window.db = db
  console.log('数据库打开成功');
};

export function add(name = storeName, value) {
  return new Promise((resolve, reject) => {
    let result = db.transaction([name], 'readwrite')
      .objectStore(name)
      .add({
        value
      });
    result.onsuccess = event => {
      resolve(event)
      console.log('数据写入成功');
      console.log(event);
    };

    result.onerror = event => {
      reject(event.target.error)
      console.log('数据写入失败');
      console.error(event.target.error);
    }
  })
}

export function read(name = storeName, key) {
  return new Promise((resolve, reject) => {
    var objectStore = db.transaction([name]).objectStore(name);
    var result = key !== undefined ? objectStore.get(key) : objectStore.getAll()


    result.onsuccess = function () {
      resolve(result.result)
      console.log(result.result);
    };
    result.onerror = function (event) {
      reject(event.target.error)
      console.log('事务失败');
      console.error(event.target.error);
    };
  })
}