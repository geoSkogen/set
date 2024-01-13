//(function () {

// CONSTANTS
const GAME = new Game()
const BOARD = new Gameboard(document.getElementById('app'))
const PLAYER = new Player()
const MODAL = new Modal()

// FUNCTION - DOM event handler using global constants
function _init_card_selection(target_element) {

  let set = GAME.selectCard(target_element.id.replace('card-',''))
  GAME.syncCardStates([target_element])

  if (set) {
    let new_card_elements = []
    let set_cards_ids = GAME.cycleSet(set)
    let set_cards = BOARD.removeCardElements(set_cards_ids)

    PLAYER.addSet(set)

    MODAL.showCards(set_cards)

    if (GAME.cardsInPlay < GAME.tableSize) {
      new_card_elements = BOARD.addCardElements(GAME.addCards(GAME.rowSize))
      GAME.syncCardStates(new_card_elements)
    }
  }
}

// PROCEDURE
// Create HTML elements for every card in the deck and store them on the gameboard
Object.keys(GAME.deck.cards).forEach( (deck_key) => {

  let card_html_element = BOARD.createCardElement(GAME.deck.cards[deck_key])

  // EVENT LISTENERS - select a card
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

// EVENT LISTENERS
// Add row
document.getElementById('addRowShell').addEventListener('click', function (event) {
  BOARD.addCardElements(GAME.addCards(GAME.rowSize))
})

document.getElementById('addRowShell').addEventListener('keyup', function (event) {
  if (event.code==='Enter') {
    BOARD.addCardElements(GAME.addCards(GAME.rowSize))
  }
})

// Show score / settings menu
document.getElementById('settingsShell').addEventListener('click', function (event) {
  MODAL.showScore(PLAYER.score,event.target.id)
})

document.getElementById('settingsShell').addEventListener('keyup', function (event) {
  if (event.code==='Enter') {
    MODAL.showScore(PLAYER.score,event.target.id)
  }
})

// Close modal
MODAL.closeModalElement.addEventListener('click',function (event) {
  MODAL.hideModal()
})

MODAL.closeModalElement.addEventListener('keyup',function (event) {
  if (event.code==='Enter') {
    MODAL.hideModal()
  }
})

// TODO: add feature to dismiss modal with escape key

//})()
