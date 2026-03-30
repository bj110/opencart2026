import{Page, Locator} from '@playwright/test';
import{ShoppingCartPage} from '../pages/ShoppingCartPage';

export class ProductPage{
    private readonly page:Page;

    //Locators
    private readonly txtQuantity:Locator;
    private readonly btnAddToCart:Locator;
    private readonly cnfMessage:Locator;
    private readonly btnItems:Locator;
    private readonly lnkViewcart:Locator;

    //constructor

    constructor(page:Page)
    {
        this.page=page;

        //Initialize locators with CSS Selectors
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.locator("#button-cart");
        this.cnfMessage = page.locator(".alert.alert-success.alert-dismissible");
        this.btnItems = page.locator("#cart");
        this.lnkViewcart = page.locator("strong:has-text('View Cart')");
    }

    //Action methods

    /**
     * Sets product quantity
     * @param qty - Quantity to set 
     */
    async setQuantity(qty:string)
    {
        this.txtQuantity.fill('');
        this.txtQuantity.fill(qty)
    }

    /**
     * Add product to cart
     */
    async addToCart():Promise<void>
    {
        await this.btnAddToCart.click();
    }

    /**
     * Check if confirmation message is visible
     * @param - returns Promise<boolean> - true if visible
     */
    async isConfirmationMessageVisible():Promise<boolean>
    {
        try{
            if(this.cnfMessage!=null)
            {
                return true;
            }
            else
            {
                return false;
            }
        } catch(error) {
            console.log(`Confirmation message is not found: ${error}`);
            return false;
        }
    }

    /**
     * Clicks on Items to navigate to cart
     */

    async clickItemsToNavigateToCart():Promise<void>
    {
        await this.btnItems.click();
    }

    /**
     * Clicks on View Cart link
     * @returns Promise<ShoppingCartPage> - Returns ShoppingCartPage instance
     */
    async clickViewCart():Promise<ShoppingCartPage>
    {
        await this.lnkViewcart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
     * complete workflow to add product to cart
     * @param quantity - Quantity of product to add
     */
    async addProductToCart(quantity:string):Promise<void>
    {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }
 



}