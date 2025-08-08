Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Patrício Henrique')
    cy.get('#lastName').type('Lehn')
    cy.get('#email').type('patricio.lehn@gmail.com')
    cy.get('#open-text-area').type('Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste', {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitComParametros', (firstName, lastName, email, message) => {
    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#open-text-area').type(message, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitComObjeto', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.texto, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitComDadosPadraoNoObjeto', (data = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    texto: 'teste com parametro padrão'
}) => {
  
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.texto, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
})
