
let cropper;
const capture = document.getElementById("capture");
const screenshot = document.getElementById("initialImage");
let previewImg = document.getElementById("preview");
let searchOptions = document.getElementById("search-op");


capture.addEventListener('click', () => {
    chrome.runtime.sendMessage({action: 'captureScreenshot'}, (response) => {
        if(response.imageURL) {
            showImage(response.imageURL);
        }
    });
});

function showImage(imageURL){
    screenshot.src = imageURL;
    screenshot.onload = () => {
        document.getElementById("crop").style.display = "block"
        cropper = new Cropper(screenshot, {
            initialAspectRatio: 1 / 1,
            aspectRatio: NaN,
            zoomOnWheel: true,
            guides: true,
            highlight: true,
        });
    };
}

document.getElementById("crop").addEventListener('click', () => {
    if(!cropper){
        alert("Please Select An Region");
    }

    const preview = cropper.getCroppedCanvas();
    let croppedImg = preview.toDataURL('image/png');

    cropper.destroy();
    previewImg.src = croppedImg;
    
    document.querySelector(".pre-con").style.display = "block";
    document.querySelector(".con").style.display = "none";

    document.getElementById("crop").style.display = "none"
    searchOptions.style.display = "block";
})