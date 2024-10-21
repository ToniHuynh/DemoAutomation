import { test, expect } from '@playwright/test'
import LoginHelper from '../helpers/LoginHelper'
import DataReader from '../helpers/jsonhelper'
import HomePage from '../POM/homePage'
import CartPage from '../POM/cartPage'
 

test.describe('Place Order', () => {
    test.use({ storageState: './auth/user.json' })
    test('Order', async ({ page }) => {
    
        await page.goto('/')
        await expect(page).toHaveTitle('Demo Web Shop')
    
        const homePage = new HomePage(page)
        
        if (await homePage.isUserNOTLoggedIn()) {
            const loginHelper = new LoginHelper(page)
            await loginHelper.login()
        }else console.log("User is already logged in")
    
        const productData = DataReader.readJSON('../data/productdata.json');
        let itemList: Array<string> = []

        //extract the products and its category then put into the array
        for(const product of productData.products){
            itemList.push(`${product.category}:${product.name}`) 
        }
        //start adding item from the list of products to the cart
        await homePage.orderProducts(itemList)

        //click the cart button
        await homePage.clickCartIcon()
        await expect(page).toHaveURL('/cart')

        //edit the quantity of the product in the cart
        const cartPage = new CartPage(page)
        await cartPage.editCart("Casual Golf Belt", "20") 
        
        //estimate the shipping cost
        await cartPage.estimateShipping()

        await page.waitForTimeout(3000)
        
    })
})

