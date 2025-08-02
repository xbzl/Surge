const FLASH_PHOTO_KEYWORDS = ["flash", "moment", "disappear", "burn"]; 

let url = $request.url;
let headers = $request.headers;


function isFlashPhoto(url) {
    return FLASH_PHOTO_KEYWORDS.some(keyword => 
        url.toLowerCase().includes(keyword)
    );
}


function notify(title, subtitle, openUrl) {
    $notification.post(
        title,
        subtitle,
        "点击在Safari中查看闪照",
        { "open-url": openUrl }
    );
}

(async () => {

    const isBluedApp = headers["User-Agent"]?.match(/Blued|Media/i);
    
    if (isBluedApp && isFlashPhoto(url)) {
        notify("📸 Blued闪照提醒", "点击查看对方闪照", url);
        console.log(`捕获闪照: ${url}`);
    }
    
    $done({});
})();
