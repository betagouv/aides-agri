describe('aide page', () => {
  it('has a title', () => {
    cy.visit('http://localhost:8000/aide/3-organisme-1-aide-5')

    cy.findByRole('heading', { level: 1 })
      .should('have.text', 'Aide 5')
  })
})
