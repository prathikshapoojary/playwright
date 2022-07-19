import { test, expect, chromium, Page} from '@playwright/test';

let page:Page; //create variable with page
test.beforeAll(async ({browser}) =>{
    page = await browser.newPage(); //Create a new Page instance
});

test('Navigate to website', async () => {
    await page.goto('https:...');
});

test('test1', async ( ) => {
  //code here
});

test('test2', async () => {
  //code here
    
})

