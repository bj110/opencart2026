import {Page, Locator} from '@playwright/test';

export class LoginPage{

    private readonly page:Page;

    //Locators
    private readonly txtEmailAddress:Locator;
    private readonly txtPassword:Locator;
    private readonly btnLogin:Locator;
    private readonly txtErrorMessage:Locator;


    //Initialize locators with CSS Selector
    constructor(page:Page)
    {
        this.page = page;

        //initialize locators with css selectors
        this.txtEmailAddress = page.locator("#input-email");
        this.txtPassword = page.locator("#input-password");
        this.btnLogin = page.locator("input[value='Login']");
        this.txtErrorMessage = page.locator(".alert.alert-danger.alert-dismissible");
    }


    /**
     * Sets the email address in the email field
     * @param email - Email address to enter
     */
    async setEmail(email:string)
    {
        await this.txtEmailAddress.fill(email);
    }

    /**
     * Sets the password in the password field
     * @param pwd - Password to enter
     */
    async setPassword(pwd:string)
    {
        await this.txtPassword.fill(pwd);
    }

    /**
     * Clicks the login button
     */
    async clickLogin()
    {
        await this.btnLogin.click();
    }

    /**
     * performs complete Login action
     * @param email - Email address to enter 
     * @param pwd - Password to enter     * 
     */
    async login(email:string, pwd:string)
    {
        await this.setEmail(email);
        await this.setPassword(pwd);
        await this.clickLogin();
    }

    async getLoginErrorMessage():Promise<null|string>
    {
        return(this.txtErrorMessage.textContent());    
    
    }

}