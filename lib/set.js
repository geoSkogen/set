class Set {

  #cards = []
  #id = ''

  /**
  * @param array - an array of Card objects
  */
  constructor(cards_arr) {
    let error = false
    if (Object.keys(cards_arr).length) {
      for (let i = 0; i < Object.keys(cards_arr).length; i++) {
        let card_obj = cards_arr[Object.keys(cards_arr)[i]]
        if (card_obj.constructor.name === 'Card') {
          this.#id += card_obj.getDeckKey
          this.#id += i < Object.keys(cards_arr).length-1 ? '.' : ''
        } else {
          error = true
          this.#cards = []
          this.#id = 'error'
          console.log('Set::constructor expects an associative array of Card objects.')
          break
        }
      }
    } else {
      console.log('Set::constructor expects an associative array as an arugment.')
    }
  }

  /**
  * @return string
  */
  get getID() {
    return this.#id
  }

  /**
  * @return array
  */
  get getCardIDs() {
    return this.#id.split('.')
  }
}
