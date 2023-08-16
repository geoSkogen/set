class Gameboard {

  #appElement = {}
  #addButton = {}
  #settingsButton = {}

  #cardElements = {}

  constructor(dom_element) {
    this.#appElement = document.getElementById('app')
    this.#addButton = document.getElementById('addRowIcon'),
    this.#settingsButton = document.getElementById('settingsIcon')
  }

  createCardElement(card_obj) {
    if (card_obj.constructor.name==='Card') {
      let card_props = card_obj.getTestFields
      let card_el = document.createElement('div')
      let inner_str = ''
      for (let i = 0; i < card_props.quantity; i++) {
        let delimiter = i < card_props.quantity-1 ? ' ' : ''
        inner_str += card_props.character + delimiter
      }
      card_el.appendChild( document.createTextNode( inner_str))
      card_el.className = 'setCard ' + card_props.color + ' ' + card_props.quality
      card_el.id = 'card-' + card_obj.getDeckKey
      card_el.setAttribute('tabindex','0')
      this.#cardElements[card_obj.getDeckKey] = card_el
      return card_el
    } else {
      console.log('Gameboard::cardElement expects a Card object as an argument.')
      return null
    }
  }

  addCardElements(card_ids) {
    let elements = []
    if (Array.isArray(card_ids)) {
      card_ids.forEach( (card_id) => {
        this.#appElement.appendChild(this.#cardElements[card_id])
        elements.push(this.#cardElements[card_id])
      })
    } else {
      console.log('Gameboard::addCardElements expects an array as an argument')
    }
    return elements
  }

  removeCardElements(card_ids) {
    if (Array.isArray(card_ids)) {
      card_ids.forEach( (card_id) => {
        if (this.#appElement.querySelector('#card-' + card_id)) {
          this.#appElement.removeChild( this.#appElement.querySelector('#card-' + card_id))
        } else {
          console.log('Gameboard::removeCardElements expects the ID of a child element of "#app"')
        }
      })
    } else {
      console.log('Gameboard::removeCardElements expects an array as an argument')
    }
  }

}
