import { Page, Locator, expect } from '@playwright/test'
import exp = require('constants')

export default class CheckOutPage {     
    private continueButton: Locator

    constructor(public page: Page) {
        this.continueButton = this.page.locator(".button-1.new-address-next-step-button")    
    }

    async checkOutProgress() {
        console.log("Start the checkout process")
        await this.continueButton.nth(0).click()
        await this.page.click("#PickUpInStore")
        console.log("Select pick up in store")
        await this.continueButton.nth(1).click()
        await this.page.click("#paymentmethod_2")
        console.log("Select Credit card payment method")
        await this.page.click(".button-1.payment-method-next-step-button")
        await this.page.selectOption("#CreditCardType", {label: 'Master card'})
        console.log("Select Master card and fill up the credit card details")
        await this.page.fill("#CardholderName", "Smith")
        await this.page.fill("#CardNumber", "2222400070000005")
        await this.page.selectOption("#ExpireMonth", {label: '03'})
        await this.page.selectOption("#ExpireYear", {label: '2030'})
        await this.page.fill("#CardCode", "737")
        await this.page.click(".button-1.payment-info-next-step-button")
        await this.page.click(".button-1.confirm-order-next-step-button")
        console.log("Confirm the order")

        expect(await this.page.locator(".section.order-completed > .title").textContent()).toMatch("Your order has been successfully processed!")
        await this.page.click(".button-2.order-completed-continue-button")
        console.log("Order has been successfully processed")
    }   

   
}