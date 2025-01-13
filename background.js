chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === 'captureScreenshot'){
        chrome.tabs.captureVisibleTab({format: 'png'}, (screenshotURL) => {
            if(chrome.runtime.lastError){
                console.error(chrome.runtime.lastError);
            } else {
                console.log(screenshotURL);
                sendResponse({imageURL: screenshotURL})
            }
        });
        return true;
    }
})