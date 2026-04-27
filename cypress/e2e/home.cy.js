describe('homepage', () => {
  it('has a title', () => {
    cy.visit('http://localhost:8000/')

    cy.findByRole('heading', { level: 1 })
      .should('include.text', 'Agriculteurs, agricultrices :')
      .should('include.text', 'Trouvez les aides agricoles adaptées à votre situation.')
  })
})
