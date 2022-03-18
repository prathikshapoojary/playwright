class HtmlValidation {
    constructor(filename, error_count) {
        this.filename = filename;
        this.error_count = error_count;
    }
}
const {chromium} = require('playwright');
const fs = require('fs');
const path = require( "path" );
const { exit } = require('process');
let folderPath = 'url_list.txt';

(async () => {
        const browser = await chromium.launch({
        headless: true
        });
        const context = await browser.newContext({
            viewport: {
                width: 800,
                height: 800,
             },
        });
        let errors_count = [];
        console.log("\x1b[40m","Validating...\n")
        console.log("\n")
        fs.readFile(folderPath, async function(err, data) {
            if(err) throw err;
            var array = data.toString().split("\n");
            for(i in array) {
                if(array[i]){
                    const page = await context.newPage()
                    await page.goto('validator website url');
                    await page.fill('//*[@id="doc"]',array[i])
                    await page.click('//*[@id="submit"]')
                    //await page.screenshot({ path: "screen1"+i+'mobile_friendly2.png', fullPage: true });
                    const count = await page.$$eval('.error', (el) => el.length); 
                    var file_count = new HtmlValidation(array[i], count);
                    errors_count.push(file_count)
                }
            }
            console.table(errors_count)      
            exit()
        });
    })();
