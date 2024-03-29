class Gameboard {

  #appElement = {}
  #addButton = {}
  #settingsButton = {}

  #cardElements = {}

  /**
  * @param DOMElement
  */
  constructor(dom_element) {
    this.#appElement = document.getElementById('app')
    this.#addButton = document.getElementById('addRowIcon'),
    this.#settingsButton = document.getElementById('settingsIcon')
  }

  /**
  * @param Card card_obj
  * @return DOM Element|null
  */
  createCardElement(card_obj) {

    if (card_obj.constructor.name != 'Card') {
      console.log('Gameboard::cardElement expects a Card object as an argument.')
      return null
    }

    let card_props = card_obj.getTestFields
    let card_el = document.createElement('div')
    let select_icon = document.createElement('i')
    let inner_str = ''

    for (let i = 0; i < card_props.quantity; i++) {
      let delimiter = i < card_props.quantity-1 ? ' ' : ''
      inner_str += card_props.character + delimiter
    }

    select_icon.className = 'fa fa-check-square selected-icon'
    card_el.appendChild( document.createTextNode( inner_str))
    card_el.appendChild( select_icon)
    card_el.className = 'setCard ' + card_props.color + ' ' + card_props.quality
    card_el.id = 'card-' + card_obj.getDeckKey
    card_el.setAttribute('tabindex','0')
    card_el.setAttribute('role','option')
    card_el.setAttribute(
      'aria-label',
      card_props.quantity.toString() + ' ' +
      card_props.quality + ' ' +
      card_props.character + ' ' +
      card_props.color
    )
    this.#cardElements[card_obj.getDeckKey] = card_el
    return card_el
  }

  /**
  * @param array card_ids
  * @return array
  */
  addCardElements(card_ids) {

    if (!Array.isArray(card_ids)) {
      console.log('Gameboard::addCardElements expects an array as an argument')
      return []
    }

    let elements = []

    card_ids.forEach( (card_id) => {
      this.#appElement.appendChild(this.#cardElements[card_id])
      elements.push(this.#cardElements[card_id])
    })
    return elements
  }

  /**
  * @param array card_ids
  * @return array
  */
  removeCardElements(card_ids) {

    if (!Array.isArray(card_ids)) {
      console.log('Gameboard::removeCardElements expects an array as an argument')
      return []
    }

    let return_elements = []

    card_ids.forEach( (card_id) => {
      if (this.#appElement.querySelector('#card-' + card_id)) {
        this.#cardElements[card_id].setAttribute('aria-selected','false')
        return_elements.push(this.#cardElements[card_id])
        this.#appElement.removeChild( this.#appElement.querySelector('#card-' + card_id))
      } else {
        console.log('Gameboard::removeCardElements expects the ID of a child element of Game::appElement')
      }
    })
    return return_elements
  }

}
