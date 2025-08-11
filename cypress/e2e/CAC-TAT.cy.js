describe('Central de Atendimento ao Cliente TAT', () => {
  
   beforeEach(() => {
      cy.visit('./src/index.html')
    })
  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
 })

 //Extra 1

 it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Patrício Henrique')
    cy.get('#lastName').type('Lehn')
    cy.get('#email').type('patricio.lehn@teste.com')
    cy.get('#open-text-area').type('Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste', {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('Enviar').click()
    
    cy.get('.success',).should('be.visible')
    cy.clock().tick(3000)
    cy.get('.success').should('not.be.visible')
})

//Extra 2

 it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.clock() 
  cy.get('#email').type('testesteste')
   //cy.get('button[type="submit"]').click()
   cy.contains('Enviar').click()

   cy.get('.error').should('be.visible')
   cy.clock().tick(3000)
   cy.get('.error').should('not.be.visible')
 })

 //Extra 3

 it('campo vazio após digitar um valor não numérico no telefone', () => {
   cy.get('#phone').type('abcdefghijklmnopqrstuvxwyz')
   cy.get('#phone').should('have.value', '')
 })

//Extra 4
 
 it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
   cy.clock()
   cy.get('#firstName').type('Patrício Henrique')
   cy.get('#lastName').type('Lehn')
   cy.get('#email').type('patricio.lehn@teste.com')
   cy.get('#open-text-area').type('Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste Teste', {delay: 0}) 
   cy.get('#phone-checkbox').check()
   //cy.get('button[type="submit"]').click()
   cy.contains('Enviar').click()

   cy.get('.error').should('be.visible')
   cy.clock().tick(3000)
   cy.get('.error').should('not.be.visible')
 })

//Extra 5

 it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Patrício Henrique').should('have.value', 'Patrício Henrique').clear().should('have.value', '')
    cy.get('#lastName').type('Lehn').should('have.value', 'Lehn').clear().should('have.value', '')
    cy.get('#email').type('patricio.lehn@teste.com').should('have.value', 'patricio.lehn@teste.com').clear().should('have.value', '')
    cy.get('#phone').type('999998888').should('have.value', '999998888').clear().should('have.value', '')
 })

 //Extra 6

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
     cy.clock()
     //cy.get('button[type="submit"]').click()
     cy.contains('Enviar').click()

     cy.get('.error').should('be.visible')
     cy.clock().tick(3000)
     cy.get('.error').should('not.be.visible')
 })

 //Extra 7 versão hardcode

   it('envia o formuário com sucesso usando um comando customizado hardcode', () => {
     cy.clock();
     cy.fillMandatoryFieldsAndSubmit()

     cy.get('.success').should('be.visible')
     cy.clock().tick(3000)
     cy.get('.success').should('not.be.visible')
 })

 //Extra 7 versão com parâmetro

   it('envia o formulário com sucesso usando comando customizado com parâmetros', () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitComParametros('Patrício Henrique', 'Lehn', 'patricio.lehn@teste.com', 'Teste parametrizado')

    cy.get('.success').should('be.visible')
    cy.clock().tick(3000)
    cy.get('.success').should('not.be.visible')
   })

   //Extra 7 versão com objeto

   it('envia o formulário com sucesso usando comando customizado com objeto', () => {
    const data = {
      firstName: 'Patrício Henrique',
      lastName: 'Lehn',
      email: 'patricio.lehn@teste.com',
      texto: 'Teste com objeto'
    }
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitComObjeto(data)

    cy.get('.success').should('be.visible')
    cy.clock().tick(3000)
    cy.get('.success').should('not.be.visible')
   })

   //Extra 7 versão com dados padrão no objeto

   it('envia o formulário com sucesso usando comando customizado com dados padrão no objeto', () => {
    const data = {
      firstName: 'Patrício Henrique',
      lastName: 'Lehn',
      email: 'patricio.lehn@teste.com',
      texto: 'Teste com objeto'
    }
    cy.clock();
    cy.fillMandatoryFieldsAndSubmitComDadosPadraoNoObjeto()

    cy.get('.success').should('be.visible')
    cy.clock().tick(3000)
    cy.get('.success').should('not.be.visible')
   })

   //Lição 3 - Exercício

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  //Lição 3 - Exercício extra 1

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

   //Lição 3 - Exercício extra 2

   it('seleciona um produto (Blog) por seu índice', () => {
      cy.get('#product').select(1).should('have.value', 'blog')
   })
  
  //Lição 4 - Exercício

   it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
   })

  //Lição 4 - Exercício extra

  it('marca cada tipo de atendimento', () => {
      cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked')
    })  
   })

   //Lição 5 - Exercício

   it('marca ambos os checkboxes, depois desmarca o último', () => {
     cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
   })

   //Lição 6 - Exercício

   it ('seleciona um arquivo da pasta fixtures', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
   })

   //Lição 6 - Exercício extra 1

   it ('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
   })

   //Lição 6 - Exercício extra 2

   it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json', { encoding: null}).as('meuArquivo')
      cy.get('#file-upload').selectFile('@meuArquivo')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
   })

   //Lição 7 - Exercício

 /*  
 Forma alternativa que fiz antes de ver a correção do exercício, também funcionou, porém vou deixar a validação 
 do instrutor como a principal
 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
      cy.get('a[href="privacy.html"')
      .should('have.attr', 'target', '_blank')
   })
   */

   it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () =>{
      cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
   })

    //Lição 7 - Exercício extra

      it('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
      cy.get('a[href="privacy.html"')
      .invoke('removeAttr', 'target')
      .click()
      .title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

      //validação adicional utilizada pelo instrutor:

      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
   })

   //Lição 12 - Exercício extra 2

   it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
      cy.get('.success')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso')
        .invoke('hide')
        .should('not.be.visible')
      cy.get('.error')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('not.be.visible')
   })

   it('preenche o campo da área de texto usando o comando invoke', () => {
      cy.get('#open-text-area').invoke('val', 'Texto teste invoke').should('have.value', 'Texto teste invoke')
   })

   // Lição 13 - Exercício extra 4 - Resolvido de duas formas, a primeira comentada foi minha, antes de ver a resposta do tutor

   it("faz uma requisição HTTP", () => {
      /*cy.request({
        method: 'GET',
        url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).contains('CAC TAT');
      }) */

        cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')
        .its('status')
        .should('be.equal', 200)
        cy.get('@getRequest')
          .its('statusText')
          .should('be.equal', 'OK')
        cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
   })

   //Desafio - Encontre o gato

   it('Encontre o gato', () => {
    cy.get('#cat').invoke('show').should('be.visible')
    cy.get('#title').invoke('text', 'CAT TAT')
    cy.get('#subtitle').invoke('text', 'Eu ❤️ gatos')
   })
})

