describe('homepage', () => {
    it('has a title', () => {
        cy.visit('http://localhost:8000/')

        cy.findByRole('heading', { level: 1 })
          .should('have.text', 'Agriculteurs, agricultrices :un projet, une difficulté ?')
    })
})
