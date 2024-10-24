This demoAutomation project showcases my automation skills using Playwright and TypeScript, and it's available as a public repository.
The demo website used is https://demowebshop.tricentis.com/
Currently, there are 2 test scenarios: a.Register a new account, and b.Test placing an order of some items with an existing account.
When placing an order, the script first checks if the user is logged in. If not, it will log in before proceeding with the order.
The automation framework follows the Page Object Model (POM) pattern. Here's an overview of the project structure:
The user credential is encrypted and stored in '../data/userdata.json'.
The login session is stored in '../auth/user.json' file and can be reused for other tests.
The products to be ordered can be modified in the '../productdata.json' file.
The testing pages and their components are in '../POM/ folder.
The utility functions are stored in '../helpers/' folder.
The test scripts are stored in '../tests/' folder with the default script being 'Order.spec.ts'.
If you download the project, you can run the order test with this command: $env:SECRET_KEY="mysecretkey12345"; npx playwright test
