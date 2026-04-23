describe('homepage with besoins form', () => {
  it('has a title', () => {
    cy.visit('http://localhost:8000/?departement=13&filieres=1&filieres=2')

    cy.findByRole('heading', { level: 1 })
      .should('include.text', 'Agriculteurs, agricultrices :')
      .should('include.text', 'Trouvez les aides agricoles adaptées à votre situation.')
  })
})
