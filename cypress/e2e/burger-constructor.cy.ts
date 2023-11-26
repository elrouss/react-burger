describe('creating an order in the burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('ingredients');
    cy.visit('http://localhost:3000/');
    cy.wait('@ingredients');
  });

  context('opening and closing modal with ingredient details', () => {
    it('allows opening and closing modal', () => {
      cy.getByData('bun').within(() => {
        cy.getByData('content').children().eq(0).as('card');

        cy.get('@card')
          .should('contain', 'Краторная булка N-200i')
          .and('contain', '1255')
          .find('img')
          .should(
            'have.attr',
            'src',
            'https://code.s3.yandex.net/react/code/bun-02.png'
          );

        cy.get('@card').click();
      });

      cy.location('pathname').should(
        'equal',
        '/ingredients/643d69a5c3f7b9001cfa093c'
      );

      cy.getByData('ingredient-details')
        .should('exist')
        .should('contain', 'Краторная булка N-200i')
        .and('contain', '80')
        .and('contain', '24')
        .and('contain', '53')
        .and('contain', '420');

      cy.getByData('close-button').click();
      cy.location('href').should('equal', 'http://localhost:3000/');
    });
  });

  // it('allows an authorized user create an order', () => {
  //   cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });

  // cy.wait('@signin');
  // });

  // it('does not allow unauth user create an order', () => {
  //   expect(true).to.equal(true);
  // });
});
