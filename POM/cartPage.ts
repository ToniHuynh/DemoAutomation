import { Page, Locator, expect } from '@playwright/test'

export default class CartPage {     
    private qtyItem: Locator
    private selectCountry: Locator

    constructor(public page: Page) {
       
    }

    async editCart(productName: string, qty: string) {
        this.qtyItem = this.page.locator(`//a[contains(text(), '${productName}')]/../..//input[@class='qty-input']`)
        
        if (await this.qtyItem.isVisible()){
            await this.qtyItem.fill(`${qty}`)
            await this.page.click(".button-2.update-cart-button")
            console.log(`Updated the quantity of the product '${productName}' to '${qty}' in the cart`)
        }
        else console.log("cannot detect the quantity item")
        
    }

    async estimateShipping() {
        this.selectCountry = this.page.locator("#CountryId")
        if (await this.selectCountry.isVisible()){
            await this.selectCountry.selectOption({label: 'Australia'})
            await this.page.fill("#ZipPostalCode", "3750")
            await this.page.click(".estimate-shipping-button")
            const shippingText = (await this.page.locator(".shipping-results > .shipping-option-item > " +
                ".option-description").nth(0).textContent()).trim()
            expect(shippingText).toMatch(/^Compared to other shipping methods/)
        }    
        else console.log("cannot detect the country selection")
    }   

    async checkoutOrder() {
        await this.page.click("#termsofservice")
        await this.page.click(".checkout-button")
        await expect(this.page).toHaveURL('/onepagecheckout')
    }
}