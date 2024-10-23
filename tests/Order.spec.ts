import { test, expect } from '@playwright/test'
import LoginHelper from '../helpers/LoginHelper'
import DataReader from '../helpers/jsonReader'
import HomePage from '../POM/homePage'
import CartPage from '../POM/cartPage'
import CheckOutPage from '../POM/checkOutPage'
import { encryptData, decryptData } from '@helpers/crypto-utils'

test.describe('Place Order', () => {
    //test.use({ storageState: './auth/user.json' })
    test('Order', async ({ page }) => {
    
        await page.goto('/')
        await expect(page).toHaveTitle('Demo Web Shop')
    
        const homePage = new HomePage(page)
        
        if (await homePage.isUserNOTLoggedIn()) {
            const loginHelper = new LoginHelper(page)
            await loginHelper.login()
        }else console.log("User is already logged in")
    
        const productData = DataReader.readJSON('productdata.json');
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

        //checkout the order
        await cartPage.checkoutOrder()

        //Continue the checkout process
        const checkOutPage = new CheckOutPage(page)
        await checkOutPage.checkOutProgress()

        //await page.waitForTimeout(3000)

        
    })
})

// test.describe('Encrypt credential', () => {
//     test('Encrypt credentials', async ({ page }) => {
//         // Example credentials to be encrypted
//     const userCredentials = {
//         username: 'testerdemo1000@gmail.com',
//         password: 'Test123!'
//     };
  
//     // Encrypt the credentials before storing or sending them
//     // const encryptedUsername = encryptData(userCredentials.username);
//     // const encryptedPassword = encryptData(userCredentials.password);
    
//     // // Display the encrypted values (for demonstration purposes)
//     // console.log('Encrypted Username:', encryptedUsername);
//     // console.log('Encrypted Password:', encryptedPassword);
    
//     // Decrypt the credentials before using them in your tests
//     const decryptedUsername = decryptData("U2FsdGVkX1858Bo2VbSwCsPkgm7JMlb7177VoLiO2KeFKsOOxZ3srRMmE8pSq69T")
//     const decryptedPassword = decryptData("U2FsdGVkX19yJMInJNplTIMczF1tpXsd8rOsoalD3FY=")
//     console.log('Decrypted Username:', decryptedUsername)
//     console.log('Decrypted Password:', decryptedPassword)
    
//     })
    
// })