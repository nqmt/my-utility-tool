self.onmessage = function(event) {
    console.log("[for.js] blob = ", event.data);
    self.postMessage("SAMPLE_PROCESSED_DATA");
}