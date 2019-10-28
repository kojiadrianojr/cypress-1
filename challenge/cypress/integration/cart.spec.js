//File: challenge/cypress/integration/cart.spec.js

describe('Testing Frontoffice', function(){ 

    const url = 'http://automationpractice.com/index.php' 

    beforeEach(function () {
        cy.visit(url)
    })
    
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
    })

    it('Test#1 - Searching for Dress', function () { 

        //Step 1. I'd like to view the site using `iphone 6`
        cy.viewport('iphone-6')

        //Step 2. I'd like to search : `Printed` and click `Search` or submit
        cy.get('form#searchbox').within(($form) => {
            cy.get('input[name=search_query]').type("Printed")
            cy.root().submit()
        })

        //Step 3. In `Sort by` option i'd like to sort to `Price: Highest first`
        cy.get('form#productsSortForm').within(($form) => {
            cy.get('select').select('price:desc')
        })

        //Step 4. Below item's list `Showing 1 - 5 of 5 items` i want to check if the length is equal to `5`
        cy.get('ul.product_list').children().should('have.length', 5)

        //Step 5. Id like to `Quick View` the `Printed Chiffon Dress`
        cy.get('ul.product_list > li').within((el) => {
          cy.get('a.product-name').contains("Printed Chiffon Dress").click()
        })
        
    })

    /**
     * The above code automates the searching of item category `Printed`.
     * The challenge is contine to automate adding items to cart.
     */
    it('Test#2 - Adding to Cart', function(){

        //I'd like to view the site using `iphone 6` but in `landscape` mode
        cy.viewport('iphone-6', 'landscape')

        //From `Test#1` repeat `steps 2 - 5`
	
	cy.get('form#searchbox').within(($form)=>{
	  cy.get('input[name=search_query]').type("Printed")
	  cy.root().submit()
	})
	
	cy.get('form#productsSortForm').within(($form)=>{
	  cy.get('select').select('price:desc')
	})
         
	cy.get('ul.product_list').children().should('have.length',5)
	cy.get('ul.product_list > li').within((el)=>{
	  cy.get('a.product-name').contains("Printed Chiffon Dress").click()
	})


        //Step 6. Id like to `View larger` the `Printed Chiffon Dress`
	cy.get('#bigpic').click()
	cy.get('a[title="Close"]').click()
        //Step 7. Id like to select these attributes:
                // `Quantity` = `2` 
                // `Size` = `M`
                // `Color` = `Green`
        cy.get('#buy_block').within(($form)=>{
		cy.get('#quantity_wanted')
		  .clear()
		  .type('2')
		  .should('have.value','2')
		cy.get('#group_1').select('2')
		  .should('have.value','2')
		cy.get('li a[title="Green"]').click()
		  .parent().should('have.class','selected')	
	}) 
        //Step 8. Click `Add to Cart` 
	cy.contains('Add to cart').click()
	cy.get('#layer_cart').should('be.visible')
        //Step 9. Click `Proceed to Checkout`
	cy.contains('Proceed to checkout').click()
	cy.url()
	  .should('includes','/index.php?controller=order')
        //Step 10. From `SHOPPING-CART SUMMARY` i want to `Continue shopping`
	cy.get('a[title="Continue shopping"]').click() 
    })
})

