import { expect, Locator, Page } from '@playwright/test'
import JSONWriter from '@helpers/jsonWriter'

export default class HomePage {
        private loginButton: Locator
        private cartIcon: Locator
        private currentCategory: string = ''
            
        constructor(public page: Page) {
            this.loginButton = this.page.locator('a:has-text("Log in")');
            this.cartIcon = this.page.locator('span').getByText('Shopping cart', { exact: true })  
        }
    
        async isUserNOTLoggedIn(): Promise<boolean> {
            return await this.loginButton.isVisible()
        }

        async clickLoginLink() {
            await this.loginButton.click()
        }

        async orderProducts(selectedItems: string[]) {
            const cartQtyLocator = this.page.locator("span.cart-qty") // the number of items in the cart
            let beforeQuantity = await this.getCartQuantity(cartQtyLocator) // get the number of items in the cart
            console.log('beforeQuantity: ', beforeQuantity)

            for (const product of selectedItems) {
                const [category, subcategory, productName] = product.split(':')
                console.log('category: ', category)
                console.log('subcategory: ', subcategory)
                console.log('productName: ', productName)

               // Navigate to the category page
                const categoryLink = this.page.locator(`.top-menu [href='/${category.toLowerCase()}']`)

                if (!await categoryLink.isVisible()) { 
                    // Check if the category exists
                    console.log(`Category '${category}' not found`) 
                    JSONWriter.writeJSON(category, productName, "Cannot add item. Category not found")
                    continue // Skip the current product and move to the next one
                }

                // Check if a subcategory is provided and visible
                if (subcategory!=="none") {
                    await this.page.hover(`.top-menu [href='/${category.toLowerCase()}']`) // Hover over the category link
                    const subcategoryLink = this.page.locator(`.top-menu [href='/${subcategory.toLowerCase()}']`)
                    
                    if (!await subcategoryLink.isVisible()) { 
                        // Check if the subcategory exists
                        console.log(`Subcategory '${subcategory}' not found`) 
                        JSONWriter.writeJSON(`${category} -> ${subcategory}`, productName, "Cannot add item. Subcategory not found")
                        continue // Skip the current product and move to the next one
                    } 
                    
                    // Click the subcategory link if it exists
                    await subcategoryLink.click()
                } else {
                    if(this.currentCategory !== category){
                        // Click the category link if no subcategory is provided
                        await categoryLink.click()
                        this.currentCategory = category
                    }
                }

                // Add the product to the cart
                const addToCartButton = this.page.getByText(productName).locator('..').locator('..').getByRole('button')

                await this.page.waitForLoadState('load')

                // Check if the "Add to cart" button is visible, If not, the product is not available
                if (!await addToCartButton.isVisible()) { 
                    console.log(`Product '${productName}' is not available`) 
                    JSONWriter.writeJSON(category, productName, "Cannot add item. Product is not available")
                    beforeQuantity -= 1
                    continue // Skip the current product and move to the next one
                }
                // Wait for the Ajax response to the request to add the item to the cart
                const [response] = await Promise.all([
                    this.page.waitForResponse(response => response.url().includes('/addproducttocart') 
                                                            && response.status() === 200),
                    await addToCartButton.click() // Click the order button
                ])
       
                const message = await this.page.locator(".content").textContent()
                if (message === 'Out of stock') {
                    JSONWriter.writeJSON(category, productName, "Cannot add item. Out of stock")
                    console.log('Cannot add item. Out of stock')
                    beforeQuantity -= 1
                }else{
                    JSONWriter.writeJSON(category, productName, "Added item to cart")
                    console.log('Added item to cart')
                } 
            }

            // Check if the number of items in the cart has increased by the number of selected items
            const afterQuantity = await this.getCartQuantity(cartQtyLocator)
            console.log('afterQuantity: ', afterQuantity)
            expect(afterQuantity).toEqual(beforeQuantity + selectedItems.length)
           
        }

        private async getCartQuantity(cartQtyLocator: Locator): Promise<number> {
            const cartItems = (await cartQtyLocator.textContent()) || ''
            return cartItems ? parseInt(cartItems.match(/\d+/)?.[0] || '0', 10) : 0
        }

        async clickCartIcon() {
            await this.cartIcon.click()
        }
}