describe('Registration e2e test', () => {
    beforeEach(() => {
        cy.visit('/journey');
        cy.fixture('userStart').then(({ name, lastName, email }) => {
            cy.findByLabelText('Name').type(name);
            cy.findByLabelText('Last name').type(lastName);
            cy.findByLabelText('Email').type(email);
            cy.findByText('Go ahead!').click();
        });
    });

    it('Should search for an image', () => {
        cy.findByRole('searchbox').type('cats{enter}');
        cy.findByAltText(/[a-zA-Z]/).should('exist');
        cy.findByRole('searchbox').should('be.disabled');
    });

    it('Should allow image selection', () => {
        cy.findByRole('searchbox').type('cats{enter}');
        cy.findAllByAltText(/[a-zA-Z]/).then((res) => {
            const randomElement = Math.floor(Math.random() * res.length);
            res[randomElement].click();

            cy.findByText(/3 points out of \d+/, { exact: false }).should('exist');
            cy.findByRole('searchbox').should('not.be.disabled');
        });
    });
});
