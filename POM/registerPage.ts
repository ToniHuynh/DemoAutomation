import { Page} from "@playwright/test";

export default class RegisterPage{

    constructor (public page: Page) {
    }

    async enterUserInfo (gender: string, firstname: string, lastname: string, email: string, 
                         password: string, confirmpass: string){
        
        await this.page.locator(`#gender-${gender}`).check()
        await this.page.locator("#FirstName").fill(firstname)
        await this.page.locator("#LastName").fill(lastname)
        await this.page.locator("#Email").fill(email)
        await this.page.locator("#Password").fill(password)
        await this.page.locator("#ConfirmPassword").fill(confirmpass)

    }

    async clickRegisterButton() {
       await this.page.click('#register-button')
    }
}