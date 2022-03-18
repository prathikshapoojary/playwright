const { chromium } = require('playwright');// to load the playwright 
(async () => {
    const browser = await chromium.launch({ 
        headless: true,//to view website in browser while excuting
    });
    const context = await browser.newContext()
    const page = await context.newPage()
    const response = await page.goto('www.example.com')//opening URL
    
    var fs = require('fs')

    const path = 'url_list.txt'
    try {
        fs.unlinkSync(path)//file removed
    } catch(err) {
        console.error(err)
    }

    var logger = fs.createWriteStream('url_list.txt', {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })

    let view_source = await page.$$('a')
    for (let i = 0; i < view_source.length; i++)
    {    
        
        var url = await page.$eval("a >> nth="+i, (el) => el.href);//checking one by one a tag
        if(url.includes('/somekeyword/'))//enter some key to list one type of url
        {
            logger.write(url+"\n");//printing url 
        }    
    }

    console.log("Done")
    process.exit(1);//to exit from browser
})();
