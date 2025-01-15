
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
        cropper = new Cropper(screenshot, {
            initialAspectRatio: 16 / 9,
            aspectRatio: NaN,
            zoomOnWheel: true,
            guides: true,
            highlight: true,
        });
    };
}