class Card {

  #quantity = 0
  #color = ''
  #quality = ''
  #character = ''

  #domElement = {}

  #inPlay = false
  #inDeck = false
  #inSet = false
  #isSelected = false

  #setID = ''
  #deckKey = ''

  constructor(quantity_int, color_str, quality_str, character_str, dom_element_obj, deck_key_str) {
    this.#quantity = quantity_int
    this.#color = color_str
    this.#quality = quality_str
    this.#character = character_str
    this.#domElement = dom_element_obj
    this.#deckKey = deck_key_str
  }

  get getTestFields() {
    return {
      'quantity' : this.#quantity,
      'color' : this.#color,
      'quality' : this.#quality,
      'character' : this.#character
    }
  }

  get getStatus() {
    return {
      'in-deck' : this.#inDeck,
      'in-play' : this.#inPlay,
      'in-set' : this.#inSet,
      'aria-selected' : this.#isSelected
    }
  }

  get getDeckKey() {
    return this.#deckKey
  }

  get isSelected() {
    return this.#isSelected
  }

  addToSet(id_str) {
    let result = false
    if (this.#inPlay && this.#isSelected && !this.#setID) {
      this.#inPlay = false
      this.#isSelected = false
      this.#inSet = true
      this.#setID = id_str
      result = this.#inSet
    }
    return result
  }

  addToDeck() {
    let result = false
    if (!this.#inDeck) {
      this.#inDeck = true
      this.#inPlay = false
      this.#inSet = false
      this.#isSelected = false
      result = this.#inDeck
    }
    return result
  }

  putInPlay() {
    let result = false
    if (this.#inDeck) {
      this.#inDeck = false
      this.#inPlay = true
      this.#inSet = false
      this.#isSelected = false
      result = this.#inPlay
    }
    return result
  }

  select() {
    let result = false
    if (this.#inPlay && !this.#isSelected) {
      this.#isSelected = true
      result = this.#isSelected
    }
    return result
  }

  unselect() {
    let result = false
    if (this.#isSelected) {
      this.#isSelected = false
      result = true
    }
    return result
  }

  set setSetID(id_str) {
    this.#setID = id_str
  }
}
