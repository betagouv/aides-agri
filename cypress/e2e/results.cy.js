describe('results page', () => {
  it('has a title', () => {
    cy.visit('http://localhost:8000/aides?departement=13&filieres=1&filieres=2')

    cy.findByRole('heading', { level: 1 })
      .should('have.text', 'Vos résultats')
  })
})
