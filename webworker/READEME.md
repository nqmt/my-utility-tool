# Webworker 🦄

## Problem JS is blocking while heavy execute

```javascript
// benchmark test
var start = Date.now(); // milliseconds
var x = 0;
for (var i = 0; i < 200000000; i++){
  x = x + i;
}
console.log('ended in : ', -(start - Date.now())/1000, ' seconds');
// ended in :  9.867  seconds
```

## Use another thread with 🚀 Webworkers

### Example 1

```javascript
// main
var workerFor = new Worker('../workers/for.js');
// listen to message event of worker
workerFor.onmessage = function(event){
    var div = document.getElementById('result');
    div.innerHTML = 'message received => ' + event.data;
    workerFor.terminate();
};
// listen to error event of worker
workerFor.onerror = function(event) {
    console.error('error received from workerFor => ', event);
    var div = document.getElementById('result');
    div.innerHTML = 'Error!';
};
// load results from web worker
function loadResult() {
    // add loading text until `message` event listener replaces it
    var div = document.getElementById('result');
    div.innerHTML = 'loading...';
    // emit message event to worker
    workerFor.postMessage(null); // we don't need payload here
};
```

```javascript
// for.js
self.onmessage = function(event) {
    var x = 0;
    for (var i = 0; i < 200000000; i++) {
        x = x + i;
    }
    self.postMessage(x);
    self.close();
}
```

### Example 2

- This's Example is confuse

```javascript
// main
var workerFor = new Worker('../workers/for.js');
var blob = new ArrayBuffer(100);
var blobObj = {img1: new ArrayBuffer(100), img2: new ArrayBuffer(300)};
var blobArr = [new ArrayBuffer(100), new ArrayBuffer(200)];

// listen to message event of worker
workerFor.onmessage = function(event){
    console.log("[onmessage] blob = ", blob);
};
// load results from web worker
function loadResult() {
    console.log("[loadResult] blob = ", blob);
    workerFor.postMessage(blob, [blob]);
    workerFor.postMessage(blobObj, [blobObj.img1]); // transfer only blobObj.img1
    workerFor.postMessage(blobArr, [blobArr[1]]); // transfer only blobObj[1]
};
```

```javascript
// for.js
self.onmessage = function(event) {
    console.log("[for.js] blob = ", event.data);
    self.postMessage("SAMPLE_PROCESSED_DATA");
}
```

### To play

```javasciprt
yarn dev
```

[Reference learning by Uday Hiwarale](https://itnext.io/achieving-parallelism-in-javascript-using-web-workers-8f921f2d26db)
