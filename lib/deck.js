class Deck {

  #cards = {}

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

  drawCards(row_size_int) {
    let result = []
    if (Number(row_size_int)>0) {
      for (let i = 0; i < row_size_int; i++) {
        let key_index = Math.floor(Math.random()*Object.keys(this.#cards).length)
        let drawn_card = this.#cards[ Object.keys(this.#cards)[key_index] ]
        if (drawn_card && drawn_card.constructor.name==='Card') {

          drawn_card.putInPlay()
          delete this.#cards[ Object.keys(this.#cards)[key_index] ]

          result.push(drawn_card)
        } else {
          console.log('Deck::drawCards found an unknown or undefined object at deck key: ' + key_index.toString())
        }
      }
    } else {
      console.log('Deck::drawCards expects an integer greater than zero.')
    }
    return result
  }

  getCardByID(id_str) {
    return this.#cards[id_str]
  }

  get getSize() {
    return Object.keys(this.#cards).length
  }

}
