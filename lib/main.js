//(function () {

// CONSTANTS
const GAME = new Game()
const BOARD = new Gameboard(document.getElementById('app'))

// FUNCTION - DOM event handler using global constants
function _init_card_selection(target_element) {

  let set = GAME.selectCard(target_element.id.replace('card-',''))
  GAME.syncCardStates([target_element])

  if (set) {
    let new_card_elements = []
    let set_cards_ids = GAME.cycleSet(set)
    BOARD.removeCardElements(set_cards_ids)
    new_card_elements = BOARD.addCardElements(GAME.addCards(GAME.rowSize))
    GAME.syncCardStates(new_card_elements)
  }
}

// PROCEDURE
// Create HTML elements for every card in the deck and store them on the gameboard
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

// Set the gameboard by appending an array of card HTML elements to the DOM
let initial_card_elements = BOARD.addCardElements(GAME.addCards(GAME.tableSize))
// Pass each Card object's state to their corresponding card HTML elements
GAME.syncCardStates(initial_card_elements)



//})()
