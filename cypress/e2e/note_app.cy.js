describe('Note ', function () {

  beforeEach(function () {
    cy.visit('http://localhost:3000')
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
    cy.get('#username').type('testi')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    //cy.contains('Testi Testinen logged in')
  }) 

})
