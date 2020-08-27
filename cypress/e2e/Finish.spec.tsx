describe('Registration e2e test', () => {
    beforeEach(() => cy.visit('/journey/finish'));

    it('Should return to start if no winner', () => {
        cy.url().should('be', '/journey');
    });
});
