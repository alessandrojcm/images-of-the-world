describe('Registration e2e test', () => {
    beforeEach(() => cy.visit('/journey'));

    it('Should allow to click with correct data', () => {
        cy.fixture('userStart').then(({ name, lastName, email }) => {
            cy.findByLabelText('Name').type(name);
            cy.findByLabelText('Last name').type(lastName);
            cy.findByLabelText('Email').type(email);
            cy.findByText('Go ahead!').click();
        });
    });
});
