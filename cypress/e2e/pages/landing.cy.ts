describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('#\\:R2l9knan6\\:').type('test@email.com');
    cy.get('.MuiInputAdornment-root > .MuiButtonBase-root').click();
    cy.get('.css-1s9rqb3 > .MuiButton-root').click();
    cy.get('.css-1s9rqb3 > .MuiStack-root > .MuiButtonBase-root > .MuiBox-root').click();
    cy.get('.css-ydxay6 > .MuiButtonBase-root').click();
    /* ==== End Cypress Studio ==== */
  })
})