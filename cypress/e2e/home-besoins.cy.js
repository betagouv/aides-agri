describe('homepage with besoins form', () => {
  it('has a title', () => {
    cy.visit('http://localhost:8000/?departement=13&filieres=1&filieres=2')

    cy.findByRole('heading', { level: 1 })
      .should('have.text', 'Agriculteurs, agricultrices : un projet ou une difficulté ?')
  })
})
