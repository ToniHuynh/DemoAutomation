import { Page, expect } from '@playwright/test'
import HomePage from '../POM/homePage'
import LoginPage from '../POM/loginPage'
import DataReader from './jsonReader'

class LoginHelper {
    private page: Page;
    private homePage: HomePage;
    private loginPage: LoginPage;
    private userData: any;

    constructor(page: Page) {
        this.page = page;
        this.homePage = new HomePage(page);
        this.loginPage = new LoginPage(page);
        this.userData = DataReader.readJSON('../data/userdata.json');
    }

    async login() {
        // await this.page.goto('/')
        // await expect(this.page).toHaveTitle('Demo Web Shop')

        if (await this.homePage.isUserNOTLoggedIn()) {
            await this.homePage.clickLoginLink()
            await expect(this.page.locator('h1:has-text("Welcome, Please Sign In!")')).toBeVisible()

            await this.loginPage.enterCredential(this.userData.email, this.userData.password)
            await this.loginPage.clickLoginButton()

            await expect(this.page.locator(`text=${this.userData.email}`)).toBeVisible()
            await this.page.context().storageState({ path: "./auth/user.json" })
        } else {
            console.log("User is already logged in")
        }
    }
}

export default LoginHelper;