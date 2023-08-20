class Set {

  #cards = []
  #id = ''

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

  get getID() {
    return this.#id
  }

  get getCardIDs() {
    return this.#id.split('.')
  }
}
