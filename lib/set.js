class Set {

  #cards = []
  #id = ''

  constructor(cards_arr) {
    let error = false
    if (Array.isArray(cards_arr)) {
      for (let i = 0; i < Object.keys(cards_arr).length; i++) {
        let card_obj = cards_arr[Object.keys(cards_arr)[i]]
        if (card_obj.constructor.name === 'Card') {
          this.#id += card_obj.getDeckKey
          this.#id += i < Object.keys(cards_arr).length-1 ? '.' : ''
          card_obj.addToSet(this.#id)
        } else {
          error = true
          this.#cards = []
          console.log('Set::constructor expects an array of Card objects.')
          break
        }
      }
    }
  }

  get getID() {
    return this.#id
  }
}
