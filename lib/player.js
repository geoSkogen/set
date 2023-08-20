class Player {

  #sets = []

  constructor() {

  }

  get score() {
    return this.#sets.length
  }

  addSet(set_obj) {
    if (set_obj.constructor.name==='Set') {
      this.#sets.push(set_obj)
    } else {
      console.log('Player::addSet expects a Set object as an argument.')
    }
  }
}
