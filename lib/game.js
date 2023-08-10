class Game {

  #quantities = [1,2,3]
  #colors = ['purple', 'green', 'red']
  #qualities = ['none', 'b', 'i']
  #characters = ['t', 'e', 's']
  #rowSize = 3
  #tableSize = 12

  #cardsInPlay = {}
  #deck = null
  #sets = {}

  constructor() {
    if (
      typeof Deck === 'object' &&
      typeof Card == 'object' &&
      typeof Set == 'object'
    )
    {
      this.deck = new Deck(
        this.quantities,
        this.colors,
        this.qualities,
        this.characters
      )
    }
  }

  testSet(card_arr) {
    let result = null
    let is_set = true
    let test_props_arr = []
    let score_assoc = {}
    if (card_arr.length===this.rowSize) {
      card_arr.forEach( (card_obj) => {
        if (card_obj.constructor.name === 'Card') {
          if (card_obj.isSelected()) {
            test_props_arr.push( card_obj.getTestFields() )
          }
        }
      })
      if (test_props_arr.length===this.rowSize) {
        Object.keys(test_props_arr[0]).forEach( (test_field_name) => {
          test_props_arr.forEach( (test_fields) => {
            if (!score_assoc[test_field_name]) {
              score_assoc[test_field_name] = []
            }
            // If the current value is unique to the array of values in the score property, add it to that array.
            if (score_assoc[test_field_name].indexOf( test_fields[test_field_name] ) > -1) {
              score_assoc[test_field_name].push( test_fields[test_field_name] )
            }
          })
        })
        // If all cases have the same value for a property, it will appear on the score array for that property only once:
        //   it is unique to the array only when the array is empty.
        // If all cases have different values for a property,
        //   it will appear on the score array for that property as many times as there are cases.
        // Therefore, if the length of any array on the score properties is:
        //   equal to one or equal to the row size
        // -- then the card array is a set.
        Object.keys(score_assoc).forEach( (card_prop_key) => {
          if (
            score_assoc[card_prop_key].length != 1 ||
            score_assoc[card_prop_key].length != this.rowSize
          )
          {
            is_set = false
          }
        })
        if (is_set) {
          if (typeof Set == 'object') {
            result = new Set(card_arr)
          }
        }
      }
    }
    return result
  }

  cycleSet(set_obj) {
    if (set_obj.constructor.name === 'Set') {
      let ids = set_obj.getCardIDs()
      ids.forEach( (id_key) => {
        delete this.cardsInPlay[id_key]
      })
    }
    return ids
  }

  addRow() {
    let drawn_cards = this.deck.drawCards(this.rowSize)
    drawn_cards.forEach( (drawn_card_obj) => {
      if (drawn_card_obj.constructor.name === 'Card') {
        this.cardsInPlay[drawn_card_obj.getDeckKey()] = drawn_card_obj
      }
    })
    return drawn_cards
  }

}
