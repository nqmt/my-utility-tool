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