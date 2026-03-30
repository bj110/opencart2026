import {Page,Locator} from '@playwright/test';
import {CheckoutPage} from '../pages/CheckoutPage';

export class ShoppingCartPage{

    private readonly page:Page;

    //Locators
    private readonly lblTotalPrice:Locator;
    private readonly btnCheckout:Locator;

    //constructor
    constructor(page:Page)
    {
        this.page = page;

        //Initialize locators with CSS Selectors
        this.lblTotalPrice = page.locator("//*[@id='content']/div[2]/div/table//strong[text()='Total:']//following::td");
        this.btnCheckout = page.locator("a[class='btn btn-primary']");        
    }

    //Action methods

    /**
     * Get total price from the shopping cart page
     * @returns Promise<string|null> - Total price text
     */
    async getTotalPrice():Promise<string|null>
    {
        try{
            return await this.lblTotalPrice.textContent();
        }catch(error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }

    /**
     * Click on Checkout button
     * returns Promise<CheckoutPage> - CheckoutPage instance
     */
    async clickOnCheckout():Promise<CheckoutPage>
    {
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }

    /**
     * Verify if shopping cart page is loaded
     * returns Promise<boolean> - true if page is loaded
     */
    async isPageLoaded():Promise<boolean>
    {
        try{
        return await this.btnCheckout.isVisible();
        }catch(error){
            return false;
        }
    }
}

