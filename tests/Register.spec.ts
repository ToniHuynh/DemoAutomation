import { test, expect } from '@playwright/test'
import RegisterPage from '../POM/registerPage'
import DataReader from '../helpers/jsonReader'

test.describe('Register a New User', () => {
  test('Register', async ({ page }) => {
    // Read user data from JSON file
    const userData = DataReader.readJSON('userdata.json')
  
    await page.goto('/')
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('Demo Web Shop')
  
    await page.click('text=Register')
    await expect(page.locator('h1:has-text("Register")')).toBeVisible();
    
    const registerPage = new RegisterPage(page)
    await registerPage.enterUserInfo(
      userData.gender,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.password,
      userData.password
    )
    await registerPage.clickRegisterButton()

    if(await page.locator('text="The specified email already exists"').isVisible()){
      console.log('The specified email already exists')
    }else{
      await expect(page.locator('text=Your registration completed')).toBeVisible()
    }
  })
})

