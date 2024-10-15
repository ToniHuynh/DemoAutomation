import { expect, Locator, Page } from '@playwright/test'
import exp from 'constants';


export default class HomePage {
        private loginButton: Locator
            
        constructor(public page: Page) {
            this.loginButton = this.page.locator('a:has-text("Log in")');  
        }
    
        async isUserNOTLoggedIn(): Promise<boolean> {
            return await this.loginButton.isVisible()
        }

        async clickLoginLink() {
            await this.loginButton.click()
        }

        async orderProducts(selectedItems: string[]) {
            const cartQtyLocator = this.page.locator("span.cart-qty") // the number of items in the cart
            const beforeQuantity = await this.getCartQuantity(cartQtyLocator) // get the number of items in the cart
            console.log('beforeQuantity: ', beforeQuantity)

            // Navigate to the Apparel & Shoes category
            await this.page.click(".top-menu [href='/apparel-shoes']"); 

            for (const selectedItem of selectedItems) {
                // locate the Add to Cart button for the selected item
                const addToCartButton = this.page.locator(`//a[.='${selectedItem}']/../..//input`)
               
                // Wait for the Ajax response to the request to add the item to the cart
                const [response] = await Promise.all([
                    this.page.waitForResponse(response => response.url().includes('/addproducttocart') && response.status() === 200),
                    await addToCartButton.click() // Click the order button
                ])
            }

            // Check if the number of items in the cart has increased by the number of selected items
            const afterQuantity = await this.getCartQuantity(cartQtyLocator)
            console.log('afterQuantity: ', afterQuantity)
            expect(afterQuantity).toEqual(beforeQuantity + selectedItems.length)
           
        }

        private async getCartQuantity(cartQtyLocator: Locator): Promise<number> {
            const cartItems = await cartQtyLocator.textContent()
            return cartItems ? parseInt(cartItems.match(/\d+/)?.[0] || '0', 10) : 0
        }

}