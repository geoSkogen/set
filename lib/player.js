class Player {

  #sets = []

  constructor() {

  }

  /**
  * @return integer
  */
  get score() {
    return this.#sets.length
  }

  /**
  * @param Set
  */
  addSet(set_obj) {
    if (set_obj.constructor.name==='Set') {
      this.#sets.push(set_obj)
    } else {
      console.log('Player::addSet expects a Set object as an argument.')
    }
  }
}
