class Game {

  #quantities = [1,2,3]
  #colors = ['purple', 'green', 'red']
  #qualities = ['none', 'bold', 'italic']
  #characters = ['t', 'e', 's']
  #rowSize = 3
  #tableSize = 12

  #cardsInPlay = {}
  #cardsSelected = {}
  #deck = null
  #sets = {}

  constructor() {
    if (
      typeof Deck === 'function' &&
      typeof Card == 'function' &&
      typeof Set == 'function'
    )
    {
      this.#deck = new Deck(
        this.#quantities,
        this.#colors,
        this.#qualities,
        this.#characters
      )
    } else {
      console.log('Game::constructor requires Card, Deck, and Set objects.')
    }
  }

  /**
  * @return Deck
  */
  get deck() {
    return this.#deck
  }

  /**
  * @return integer
  */
  get tableSize() {
    return this.#tableSize
  }

  /**
  * @return integer
  */
  get rowSize() {
    return this.#rowSize
  }

  /**
  * @return integer
  */
  get cardsInPlay() {
    return Object.keys(this.#cardsInPlay).length
  }


  /**
  * @param array card_arr - an array of Card objects
  * @return Set|null
  */
  testSet(card_arr) {

    if (typeof card_arr != 'object') {
      console.log('Game::testSet expects an object (associative array) as an argument')
      return null
    }

    let result = null
    let is_set = true
    let test_props_arr = []
    let score_assoc = {}

    if (Object.keys(card_arr).length===this.#rowSize) {
      Object.keys(card_arr).forEach( (selected_card_deck_key) => {
        let card_obj = card_arr[selected_card_deck_key]
        if (card_obj.constructor.name === 'Card') {
          if (card_obj.isSelected) {
            test_props_arr.push( card_obj.getTestFields )
          } else {
            console.log('Game::test set was passed an unselected Card object.')
          }
        } else {
          console.log('Game::testSet was passed an unrecognized object in its array argument.')
        }
      })
      if (test_props_arr.length===this.#rowSize) {
        Object.keys(test_props_arr[0]).forEach( (test_field_name) => {
          test_props_arr.forEach( (test_fields) => {
            if (!score_assoc[test_field_name]) {
              score_assoc[test_field_name] = []
            }
            // If the current value is unique to the array of values in the score property, add it to that array.
            if (score_assoc[test_field_name].indexOf( test_fields[test_field_name] ) < 0) {
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
            score_assoc[card_prop_key].length != 1 &&
            score_assoc[card_prop_key].length != this.#rowSize
          )
          {
            is_set = false
          }
        })
        console.log(score_assoc)
        if (is_set) {
          if (typeof Set == 'function') {
            result = new Set(card_arr)
          }
        }
      }
    }
    return result
  }

  /**
  * @param Set set_obj
  * @return array
  */
  cycleSet(set_obj) {

    if (set_obj.constructor.name != 'Set') {
      console.log('Game::cycleSet expects a Set object as an argument.')
      return []
    }

    let ids = []

    ids = set_obj.getCardIDs
    ids.forEach( (id_key) => {
      delete this.#cardsInPlay[id_key]
      this.#deck.cards[id_key].addToSet(set_obj.getId)
    })
    this.#cardsSelected = {}

    return ids
  }

  /**
  * @param array html_elements - an array of DOM Elements
  * @return array - an array of DOM Elements
  */
  syncCardStates(html_elements) {
    let result = []

    if (!Array.isArray(html_elements)) {
      console.log('Game::syndCardState expects an array as an argument.')
      return []
    }

    html_elements.forEach( (html_element) => {
      if (typeof html_element === 'object') {
        let card_obj = this.#cardsInPlay[html_element.id.replace('card-','')]
        if (card_obj) {
          Object.keys(card_obj.getStatus).forEach( (card_state_prop) => {
            html_element.setAttribute(card_state_prop,card_obj.getStatus[card_state_prop])
          })
          result.push(html_element)
        } else {
          console.log('Game::syncCardState could not locate a Card in play with the provided HTML element ID.')
        }
      } else {
        console.log('Game::syncCardState expects an HTML elements array arguments.')
      }
    })

    return result
  }

  /**
  * @param integer size
  * @return array
  */
  addCards(size) {
    if (typeof size != 'number') {
      console.log('Game::addCards expects an integer as an argument.')
      return []
    }
    let drawn_card_ids = []
    let drawn_cards = this.#deck.drawCards(size)

    drawn_cards.forEach( (drawn_card_obj) => {
      this.#cardsInPlay[drawn_card_obj.getDeckKey] = drawn_card_obj
      drawn_card_ids.push(drawn_card_obj.getDeckKey)
    })
    return drawn_card_ids
  }

  /**
  * @param integer|string
  * @return Set|null
  */
  selectCard(deck_key) {
    let result = false
    deck_key = deck_key.toString()

    if (!this.#cardsInPlay[deck_key]) {
      console.log('Game::selectCard expects a valid deck key.')
      console.log(' - ' + deck_key + ' was used.')
      return result
    }

    if (this.deck.cards[deck_key].isSelected) {

      this.deck.cards[deck_key].unselect()
      delete this.#cardsSelected[deck_key]
      console.log('Game::selectCard called; card unselected.')

    } else {
      if (Object.keys(this.#cardsSelected).length < this.#rowSize) {

        this.#deck.cards[deck_key].select()
        this.#cardsSelected[deck_key] = this.#cardsInPlay[deck_key]
        console.log('Game::selectCard called; card selected.')

        if (Object.keys(this.#cardsSelected).length === this.#rowSize ) {
          let set = this.testSet(this.#cardsSelected)
          if (set) {
            result = set
            console.log('Game::selectCard - selected card completed a set.')
          } else {
            console.log('Game::selectCard - selected card did not complete a set.')
          }
        } else {
          console.log('Game::selectCard called; card selected for incomplete set.')
        }
      } else {
        console.log('Game::selectCard card selection exceeds row size.')
      }
    }
    return result
  }

}
