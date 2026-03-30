/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page 
 */

import {test, expect} from '@playwright/test';
import{HomePage} from '../pages/HomePage';
import{TestConfig} from '../test.config';
import{LoginPage} from '../pages/LoginPage';
import{MyAccountPage} from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';

//Declare shared variables
let config: TestConfig;
let homePage: HomePage;
let myAccountPage: MyAccountPage;
let loginPage: LoginPage;
let logoutPage: LogoutPage;

//SetUp before each test
test.beforeEach(async({page})=>{

    config = new TestConfig();//Load test config
    await page.goto(config.appUrl);//step1: Navigate to the application URL

    //Initialize page objects - constructor
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    myAccountPage = new MyAccountPage(page);

});

//Optional cleanup after each test
test.afterEach(async({page})=>{
    await page.close();//close the browser tab (helps to keep test clean)
});

test('User logout test @master @regression', async()=>{
    //step 2: Navigate to Login via HomePage
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //step 3: Perform login using valid credentials
    await loginPage.login(config.email, config.password);

    //step 4: Verify successful login
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

    //step 5: Click Logout link, which returns LogoutPage instance
   logoutPage =  await myAccountPage.clickLogout();

   //step 6: Verify "continue" button is visible before clicking
   expect(await logoutPage.isContinueButtonVisible()).toBe(true);

   //step 7: click Continue and verify redirection to HomePage
   homePage = await logoutPage.clickContinue();
   expect(await homePage.isHomePageExists()).toBeTruthy();


})