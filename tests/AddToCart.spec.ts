/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Test Steps:
 * 1) Navigate to the application URL
 * 2) Enter an existing product name in the search box
 * 3) Click the search button
 * 4) Verify the product appears in the search results
 * 5) Select the product
 * 6) Set quantity
 * 7) Add the product to the Cart
 * 8) Verify success message 
 */

import{test, expect} from '@playwright/test';
import{TestConfig} from '../test.config';
import{HomePage} from '../pages/HomePage';
import{SearchResultsPage} from '../pages/SearchResultsPage';
import{ProductPage} from '../pages/ProductPage';

//declare shared instances
let config:TestConfig;
let homePage:HomePage;
let searchResultsPage:SearchResultsPage;
let productPage:ProductPage;

test.beforeEach(async({page})=>{
    config = new TestConfig();
    await page.goto(config.appUrl);//1) Navigate to the application URL

    //initialize page objects
    homePage=new HomePage(page);
    searchResultsPage=new SearchResultsPage(page);
    productPage = new ProductPage(page);
});

test.afterEach(async({page})=>{
    await page.close();//close the browser tab after test
});

test("Add product to cart test @master @regression", async()=>{

    //Step 2: Enter product name in search box
    await homePage.enterProductName(config.productName);

    //Step 3: Click on the Search button
    await homePage.clickSearch();

    //Step 4: Verify search results page is displayed
   expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

   //Step 5: Verify product exists in the search results page
   const productName = config.productName;
   expect(await searchResultsPage.isProductExists(productName)).toBeTruthy();

   //Step 6-7-8 Select product -> Set Quantity ->Add to Cart -> Verify confirmation 
   if(await searchResultsPage.isProductExists(productName))
   {
    await searchResultsPage.selectProduct(productName);
    await productPage.setQuantity(config.productQuantity);
    await productPage.addToCart();

    //Step 8: Assert success message is visible
    expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
   }

});