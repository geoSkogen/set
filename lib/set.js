class Set {

  #cards = []
  #id = ''

  constructor(cards_arr) {
    let error = false
    if (Array.isArray(cards_arr)) {
      for (let i = 0; i < cards_arr.length; i++) {
        if (cards_arr[i].constructor.name === 'Card') {
          this.id += cards_arr[i].getDeckKey()
          this.id += i < cards_arr.length-1 ? '.' : ''
        } else {
          error = true
          this.cards = []
          break
        }
      }
    }
  }

  get getID() {
    return this.id
  }
}
