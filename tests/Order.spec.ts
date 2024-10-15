import { test, expect } from '@playwright/test'
import LoginHelper from '../helpers/LoginHelper'
import DataReader from '../helpers/jsonhelper'
import HomePage from '../POM/homePage'
 

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

        //proceed with order
        for(const product of productData.products){
            itemList.push(`${product.category}:${product.name}`)
        }
        
        await homePage.orderProducts(itemList)
        //await homePage.orderProducts(['Apparel-Shoes:Casual Golf Belt', 'Books:Computing and Internet'])

    })
})

