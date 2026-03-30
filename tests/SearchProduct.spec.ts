/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to theapplication URL 
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results  
 */

import{test, expect} from '@playwright/test';
import{HomePage} from '../pages/HomePage';
import{TestConfig} from '../test.config';
import{SearchResultsPage} from '../pages/SearchResultsPage';

//Declare resuable variables
let config: TestConfig;
let homePage: HomePage;
let searchResultsPage: SearchResultsPage;

//Playwright hook - runs before each test
test.beforeEach(async ({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);//1) Navigate to theapplication URL 

    //initialize page objects
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
});

//Playwright hook - runs after each test
test.afterEach(async({page})=>{
   await page.close();//closes the browser tab after test
});


test("Product Search test @master @regression", async()=>{
    const productName = config.productName;

    //Step 2 & 3: Enter product name in Search field and click search
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    //Step 4: Verify that the search result page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    //Step 5: Validate if the search product appears in results
    const isProductFound = await searchResultsPage.isProductExists(productName);
    expect(isProductFound).toBeTruthy();

});