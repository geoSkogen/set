class Gameboard {

  #app_element = {}

  constructor(root_dom_element) {
    this.#app_element = dom_element
  }

  addCardElement(card_obj) {
    if (card_obj.constructor.name==='Card') {
      let card_props = card_obj.getTestFields
      let card_el = document.createElement('div')
      let inner_str = ''
      for (let i = 0; i < card_props.quantity; i++) {
        inner_str += card_props.character
        inner_str += i ? ' ' : ''
      }
      card_el.appendChild( document.createTextNode( inner_str))
      card_el.className = 'setCard ' + card_props.color + ' ' + card_props.quality
      this.#app_element.appendChild(card_el)
      return card_el
    } else {
      console.log('Gameboard::cardElement expects a Card object as an argument.')
      return null
    }
  }

  removeCardElement(deck_id) {
    
  }


}
