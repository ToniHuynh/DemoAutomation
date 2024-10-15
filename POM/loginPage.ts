import { Page} from "@playwright/test";

export default class LoginPage{

    constructor (public page: Page) {
    }

    async enterCredential (email: string, 
                         password: string){
        await this.page.locator('#Email').fill(email)
        await this.page.locator("#Password").fill(password)

    }

    async clickLoginButton() {
       await this.page.click('.login-button')
    }
}