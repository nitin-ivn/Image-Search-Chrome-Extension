chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action === 'captureScreenshot'){
        chrome.tabs.captureVisibleTab({format: 'png'}, (screenshotURL) => {
            if(chrome.runtime.lastError){
                console.error('Error: ', chrome.runtime.lastError);
            } else {
                sendResponse({imageURL: screenshotURL})
            }
        })
    }
})