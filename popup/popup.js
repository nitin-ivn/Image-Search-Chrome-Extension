
let cropper;

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

    screenshot.onload = () => {
        cropper = new Cropper.default(screenshot, {
            aspectRatio: 0,
            viewMode: 0,
            autoCropArea: 1,
            movable: true,
            zoomable: true,
            background: true,
            responsive: true,
        });
    };
}