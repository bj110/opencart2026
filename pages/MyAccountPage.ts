import {Page, Locator} from '@playwright/test';
import {LogoutPage} from '../pages/LogoutPage';//Import Logout page if needed


export class MyAccountPage{

    private readonly page:Page;

    //Locators
    private readonly msgHeading:Locator;
    private readonly lnkLogout:Locator;

    //constructor
    constructor(page:Page)
    {
            this.page = page;

            //Initialize locators with CSS Selectors
            this.msgHeading = page.locator("h2:has-text('My Account')");
            this.lnkLogout = page.locator("a:has-text('Logout')").nth(1);
    }


    /**
     * Verifies if My Account Page is displayed
     * @returns Promise<boolean> - Returns true if heading is visible 
     */

    async isMyAccountPageExists():Promise<boolean>
    {
        try{
            const isVisible = await this.msgHeading.isVisible();
            return isVisible;
        } catch(error) {
            console.log(`Error checking My Account Page heading visibility: ${error}`);
            return false;
        }
    }

    /**
     * clicks Logout link
     * @returns Promise<LogoutPage> - returns instance of LogoutPage
     */
    async clickLogout():Promise<LogoutPage>
    {
        try{
            await this.lnkLogout.click();
            return new LogoutPage(this.page)
        } catch(error) {
            console.log(`Unable to click Logout link: ${error}`);
            throw error;//re-throw the error to fail the test
        }
    }


    /**
     * Alternative method to return page exists using title
     * @returns Promise<boolean> - Returns true if page title matches
     */

    async getPageTitle():Promise<string>
    {
       return(this.page.title());
    }

}

