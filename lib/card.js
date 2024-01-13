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

  /**
  * @param integer quantity_int
  * @param string color_str
  * @param string quality_str
  * @param string character_str
  * @param DOMElement dom_element_obj
  * @param string deck_key_str
  */
  constructor(quantity_int, color_str, quality_str, character_str, dom_element_obj, deck_key_str) {
    this.#quantity = quantity_int
    this.#color = color_str
    this.#quality = quality_str
    this.#character = character_str
    this.#domElement = dom_element_obj
    this.#deckKey = deck_key_str
  }

  /**
  * @return object
  */
  get getTestFields() {
    return {
      'quantity' : this.#quantity,
      'color' : this.#color,
      'quality' : this.#quality,
      'character' : this.#character
    }
  }

  /**
  * @return object
  */
  get getStatus() {
    return {
      'in-deck' : this.#inDeck,
      'in-play' : this.#inPlay,
      'in-set' : this.#inSet,
      'aria-selected' : this.#isSelected
    }
  }

  /**
  * @return string
  */
  get getDeckKey() {
    return this.#deckKey
  }

  /**
  * @return boolean
  */
  get isSelected() {
    return this.#isSelected
  }

  /**
  * @param string id_str
  * @return boolean
  */
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

  /**
  * @return boolean
  */
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

  /**
  * @return boolean
  */
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

  /**
  * @return boolean
  */
  select() {
    let result = false
    if (this.#inPlay && !this.#isSelected) {
      this.#isSelected = true
      result = this.#isSelected
    }
    return result
  }

  /**
  * @return boolean
  */
  unselect() {
    let result = false
    if (this.#isSelected) {
      this.#isSelected = false
      result = true
    }
    return result
  }

  /**
  * @param string
  * @return void
  */
  set setSetID(id_str) {
    this.#setID = id_str
  }
}
