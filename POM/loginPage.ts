import { Page} from "@playwright/test";

export default class LoginPage{

    constructor (public page: Page) {
    }

    async enterCredential (encryptedEmail: string, 
                         encryptedPassword: string){
        await this.page.locator('#Email').fill(encryptedEmail)
        await this.page.locator("#Password").fill(encryptedPassword)

    }

    async clickLoginButton() {
       await this.page.click('.login-button')
    }
}