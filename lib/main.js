//(function () {

const GAME = new Game()

const BOARD = new Gameboard(document.getElementById('app'))

function _init_card_selection(target_element) {

  let set = GAME.selectCard(target_element.id)
  GAME.syncCardStates([target_element])

  if (set) {

  }

}

Object.keys(GAME.deck.cards).forEach( (deck_key) => {

  let card_html_element = BOARD.createCardElement(GAME.deck.cards[deck_key])

  card_html_element.addEventListener('click', function (event) {
    _init_card_selection(event.target)
  })

  card_html_element.addEventListener('keyup', function (event) {
    if (event.code==='Enter') {
      _init_card_selection(event.target)
    }
  })
})

let initial_card_elements = BOARD.addCardElements(GAME.addCards(GAME.tableSize))

GAME.syncCardStates(initial_card_elements)



//})()
