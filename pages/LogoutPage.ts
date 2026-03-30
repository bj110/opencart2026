import{Page,Locator} from '@playwright/test';
import {HomePage} from '../pages/HomePage';

export class LogoutPage{
    private readonly page:Page;
    private readonly btnContinue:Locator;


    constructor(page:Page)
    {
        this.page = page;

        //initialize locators to CSS Selectors
        this.btnContinue = page.locator(".btn.btn-primary");
    }

    //action methods

    /**
     * Clicks the Continue button after logout
     * @returns Promise<HomePage> - Returns instance of HomePage
     */
    async clickContinue():Promise<HomePage>
    {
        await this.btnContinue.click();
        return new HomePage(this.page);
    }

    /**
     * verifies if Continue button is visible
     * returns Promise<boolean> - returns true if button is visible
     */
    async isContinueButtonVisible():Promise<boolean>
    {
        return await this.btnContinue.isVisible();
    }


   

}