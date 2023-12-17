describe('creating an order in the burger constructor', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'refreshToken',
      '417e11f2290cf4350663a3e4971b508bcca6f9cb7c802f6e4539b8edf83e41365c7bb234b756c694'
    );
    window.localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWI4NDhkMTJmNGEyMDAxYmQ1Y2FhOSIsImlhdCI6MTcwMjgzOTk1MCwiZXhwIjoxNzAyODQxMTUwfQ.eZH6SugnK2A7niCKruwsmpYH4lbnMcr0oXd303aZP2s'
    );
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

  it.only('allows an authorized user create an order', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json',
    }).as('signin');
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/token', {
      fixture: 'accessToken.json',
    });
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json',
    }).as('order');

    const dataTransfer = new DataTransfer();

    // constants
    cy.getByData('ingredients').find('a').as('ingredients');
    cy.getByData('constructor').as('constructor');
    cy.get('@constructor').getByData('total-price').as('totalPrice');
    cy.get('@constructor').find('button[type="submit"]').as('submitBtn');

    // check initial state
    cy.get('@constructor')
      .should('exist')
      .and('contain', 'Перетащите булку')
      .and('contain', 'Перетащите начинку');
    cy.get('@totalPrice').should('exist').and('contain', '0');
    cy.get('@submitBtn').should('be.disabled');

    // check drag and drop
    cy.get('@ingredients').eq(1).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor')
      .trigger('drop', { dataTransfer })
      .should('contain', 'Флюоресцентная булка R2-D3')
      .and('contain', '988');

    cy.get('@ingredients').eq(0).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor')
      .trigger('drop', { dataTransfer })
      .should('contain', 'Краторная булка N-200i')
      .and('contain', '1255');

    cy.get('@submitBtn').should('be.disabled');

    cy.get('@ingredients').eq(2).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@ingredients').eq(4).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@ingredients').eq(4).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor').trigger('drop', { dataTransfer });
    cy.get('@ingredients').eq(5).trigger('dragstart', {
      dataTransfer,
    });
    cy.get('@constructor').trigger('drop', { dataTransfer });

    cy.get('@constructor')
      .should('contain', 'Краторная булка N-200i')
      .and('contain', '1255')
      .should('contain', 'Соус Spicy-X')
      .and('contain', '90')
      .should('contain', 'Биокотлета из марсианской Магнолии')
      .and('contain', '424')
      .should('contain', 'Филе Люминесцентного тетраодонтимформа')
      .and('contain', '988');

    cy.get('@constructor').within(() => {
      cy.get('.constructor-element').should('have.length', '6');

      cy.get('.constructor-element')
        .eq(1)
        .within(() => {
          cy.get('.constructor-element__action').find('svg').as('deleteBtn');
          cy.get('@deleteBtn').click();
        });

      cy.get('.constructor-element').should('have.length', '5');
    });

    cy.get('@constructor')
      .should('not.contain', 'Соус Spicy-X')
      .and('not.contain', '90');

    // check order's creation
    cy.get('@submitBtn').should('be.enabled').click();
    // cy.wait('@signin');
    cy.getByData('order-details').should('exist');
    cy.getByData('order-number').should('exist').and('contain', '100500');

    // check closing modal and initial state
    cy.getByData('close-button').should('exist').click();
    cy.getByData('order-details').should('not.exist');
    cy.get('@constructor')
      .should('exist')
      .and('contain', 'Перетащите булку')
      .and('contain', 'Перетащите начинку');
    cy.get('@totalPrice').should('exist').and('contain', '0');
    cy.get('@submitBtn').should('be.disabled');
  });
});
