describe('Start e2e test', () => {
    beforeEach(() => cy.visit(''));

    it('Should navigate to start', () => {
        cy.findByText('Go ahead!').click();
        cy.url().should('include', '/start');
    });

    it('Should allow to click with correct data', () => {
        cy.findByText('Go ahead!').click();
        cy.fixture('userStart').then(({ name, lastName, email }) => {
            cy.findByLabelText('Name').type(name);
            cy.findByLabelText('Last name').type(lastName);
            cy.findByLabelText('Email').type(email);
            cy.findByText('Go ahead!').should('not.be.disabled');
        });
    });

    it('Should not allow to click with the incorrect data', () => {
        cy.findByText('Go ahead!').click();
        cy.fixture('userStart').then(({ name, lastName, email }) => {
            cy.findByLabelText('Name').type(name);
            cy.findByLabelText('Last name').type(lastName);
            cy.findByLabelText('Email').type(email.split('@')[1]);
            cy.findByText('Go ahead!').should('be.disabled');
        });
    });
});
