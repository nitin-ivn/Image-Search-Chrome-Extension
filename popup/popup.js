
let cropper;
const capture = document.getElementById("capture");
const screenshot = document.getElementById("initialImage");
let previewImg = document.getElementById("preview");
let searchOptions = document.getElementById("search-op");

const apiKey = CONFIG.api_key;
console.log(apiKey)

capture.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'captureScreenshot' }, (response) => {
        if (response.imageURL) {
            showImage(response.imageURL);
        }
    });
});

function showImage(imageURL) {
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
    if (!cropper) {
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
});

async function uploadImage(img) {
    const formData = new FormData();
    formData.append("image", img.split(',')[1]);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    return data.success ? data.data.image.url : null;
}


document.getElementById("searchImage").addEventListener('click', async () => {
    let data = previewImg.src;
    let imageURL = await uploadImage(data);
    if(!imageURL){
        alert("failed to upload image, Try Again");
        return
    }

    const searchUrlTinEye = `https://tineye.com/search?url=${encodeURIComponent(imageURL)}`;
    const searchUrlGoogle = `https://lens.google.com/uploadbyurl?url=${encodeURIComponent(imageURL)}`;
    chrome.tabs.create({ url: searchUrlGoogle });
    chrome.tabs.create({ url: searchUrlTinEye });
})