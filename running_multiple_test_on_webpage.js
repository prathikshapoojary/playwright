import { test, expect, chromium, Page} from '@playwright/test';

let page:Page; //create variable with page
test.beforeAll(async ({browser}) =>{
    page = await browser.newPage(); //Create a new Page instance
});

test('Navigate to unicourt website', async () => {
    await page.goto('https://staging.unicourt.com/');
});

test('Selecting case to send removal request form', async ( ) => {
    await page.locator('body > div.home-content-wrap > div > div > div > ul.feat-links-home.mt32 > li:nth-child(1) > a').click();
    await page.locator('body > div.container.main.mobile-scroll-x-hide > div.columns.courts_data > div.column.is-2.federal > div > ul:nth-child(3) > li > a').click();
    await page.locator('#coursystem > div.columns.layout-xs-col.is-variable.is-6 > div:nth-child(1) > div:nth-child(2) > div:nth-child(5) > a > span:nth-child(1)').click();
    await page.locator('body > div.container.pd > div.mb16.mt32 > div > p > a').click();
});

test('Checking removal request form by submitting with blank input', async () => {
    await page.locator('text=Submit Request').click();
    expect(await page.locator('text=Please correct the request errors and try again').isVisible())
    
})

