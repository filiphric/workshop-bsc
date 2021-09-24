// úloha #1: dynamicky zmeň názov niektorého boardu v zozname
it('dynamická zmena názvov boardov', () => {

  cy
    .intercept({
      method: 'GET',
      url: '/api/boards'
    }, (req) => {
      req.reply(res => {

      })
    }).as('boards')

  cy
    .visit('/')

})

// úloha #2: dynamicky zmeň názov novovytvoreného zoznamu
describe('zmena názvov zoznamov', () => {

  beforeEach( () => {

    cy.request('POST', '/api/boards', { name: 'new board' }).as('board')

  })

it('dynamická zmena názvov boardov', function() {

  const boardId = this.board.body.id

  cy
    .request('POST', '/api/lists', {
      boardId,
      name: 'new list'
    })

  cy
    .intercept(`/api/lists?boardId=${boardId}`).as('lists')

  cy
    .visit(`/board/${boardId}`)

  })

})