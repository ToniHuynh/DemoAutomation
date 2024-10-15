import { test, expect } from '@playwright/test'
import LoginHelper from '../helpers/LoginHelper'
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
    
        //proceed with order
        await homePage.orderProducts(['Casual Golf Belt', 'Blue Jeans'])

    })
})

