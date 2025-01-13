const capture = document.getElementById("capture");
capture.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'captureScreenshot'}, (response) => {
        if(response.imageURL) {
            showImage(response.imageURL);
        }
    });
});

function showImage(imageURL){
    const screenshot = document.getElementById("initialImage");
    screenshot.src = imageURL;
}