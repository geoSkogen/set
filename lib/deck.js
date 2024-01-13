class Deck {

  #cards = {}
  #inDeck = []

  /**
  * @param array
  * @param array
  * @param array
  * @param array 
  */
  constructor(quantities_int_arr, colors_str_arr, qualities_str_arr, chars_arr) {
    if (typeof Card === 'function') {
      if (
        Array.isArray(quantities_int_arr) &&
        Array.isArray(colors_str_arr) &&
        Array.isArray(qualities_str_arr) &&
        Array.isArray(chars_arr)
      )
      {
      quantities_int_arr.forEach( (quantity_int) => {
        colors_str_arr.forEach( (color_str) => {
          qualities_str_arr.forEach( (quality_str) => {
            chars_arr.forEach( (char) =>  {
              let card_id_str = Object.keys(this.#cards).length.toString()
              let new_card =
                new Card(
                  quantity_int,
                  color_str,
                  quality_str,
                  char,
                  {},
                  card_id_str
                )
              new_card.addToDeck()
              this.#cards[card_id_str] = new_card
              this.#inDeck.push(card_id_str)
              //
            })
          })
        })
      })
      //
      } else {
        console.log('Deck::constructor expects four arrays as arguments')
      }
    } else {
      console.log('Deck::constructor requires a Card class definition.')
    }
  }

  /**
  * @return array - an array of Card objects
  */
  get cards() {
    return this.#cards
  }

  /**
  * @param integer row_size_int
  * @return array - an array of Card objects
  */
  drawCards(row_size_int) {

    if (typeof row_size_int != 'number') {
      console.log('Deck::drawCards expects an integer an argument.')
      return []
    }

    if (Number(row_size_int)<=0) {
      console.log('Deck::drawCards expects an integer greater than zero as an argument.')
      return []
    }

    if (!Object.keys(this.#inDeck).length) {
        console.log('Deck::drawCards requested cards from an empty deck.')
        return []
    }

    let result = []
    for (let i = 0; i < row_size_int; i++) {

      let key_index = Math.floor(Math.random()*Object.keys(this.#inDeck).length)
      let drawn_card = this.#cards[ Object.keys(this.#inDeck)[key_index] ]

      if (drawn_card && drawn_card.constructor.name==='Card') {

        drawn_card.putInPlay()
        delete this.#inDeck[ Object.keys(this.#inDeck)[key_index] ]

        result.push(drawn_card)
      } else {
        console.log('Deck::drawCards found an unknown or undefined object at deck key: ' + key_index.toString())
      }
    }
    return result
  }

  /**
  * @param string id_str
  * @return Card
  */
  getCardByID(id_str) {
    return this.#cards[id_str]
  }

  /**
  * @return integer
  */
  get getSize() {
    return Object.keys(this.#cards).length
  }

}
