describe('Note ', function () {

  beforeEach(function () {
    //cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Himmeli Hommeli',
      username: 'himmeli',
      password: 'salainen'
    }

    //cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    //cy.visit('http://localhost:3000')
    cy.visit('')
  })

  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('himmeli')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    //cy.contains('Testi Testinen logged in')
  })

  it('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('himmeli')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    //cy.get('.error').contains('wrong credentials')
    //cy.get('.error').should('contain', 'wrong credentials')
    //cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    //cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    //cy.get('html').should('not.contain', 'Himmeli Hommeli logged in')
    //cy.contains('Himmeli Hommeli logged in').should('not.exist')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      //cy.contains('login').click()
      //cy.get('#username').type('himmeli')
      //cy.get('#password').type('salainen')
      //cy.get('#login-button').click()

      /*
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'himmeli', password: 'salainen'
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
      */

      cy.login({ username: 'himmeli', password: 'salainen' })
    })

    it('a new note can be created', function () {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click() // huomaa getin ja containsin ero. containsissa ei pysty käyttämään #save-button id:tä.

      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        //cy.contains('new note').click()
        //cy.get('#note-input').type('another note cypress')
        //cy.contains('save').click()

        cy.createNote({ content: 'another note cypress', important: true })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make not important')
          .click()

        cy.contains('another note cypress')
          .contains('make important')
      })

    })

    describe.only('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it.skip('one of those can be made important', function () {
        cy.contains('second note')
          .contains('make important')
          .click()

        cy.contains('second note')
          .contains('make not important')
      })

      //toimii kun <span>{note.content}</span>
      it('other of those can be made important', function () {
        //cy.contains('second note').parent().find('button').click()
        //cy.contains('second note').parent().find('button')
        //  .should('contain', 'make not important')

        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })

      it('then example', function() {
        cy.get('button').then( buttons => {
          console.log('number of buttons', buttons.length)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })

})
