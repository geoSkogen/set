class Modal {

  #appElement = {}
  #modalContentElement = {}
  #closeModalElement = {}

  constructor() {
    this.#appElement = document.getElementById('appModal')
    this.#modalContentElement = document.getElementById('modalContent')
    this.#closeModalElement = document.getElementById('closeModal')
  }

  get modalContentElement() {
    return this.#modalContentElement
  }

  get closeModalElement() {
    return this.#closeModalElement
  }

  showCards(card_element_arr) {
    let cards = []
    if (Array.isArray(card_element_arr)) {
      card_element_arr.forEach( (card_element) => {
        if (card_element.className.indexOf('setCard')>-1) {
          cards.push(card_element)
        } else {
          console.log('Modal::showCards expects setCard classified elements.')
        }
      })

      this.#modalContentElement.innerHTML = ''
      if (cards.length===card_element_arr.length) {
        cards.forEach( (card) => {
          this.#modalContentElement.appendChild(card)
        })
        this.#appElement.className = this.#appElement.className.replace('hide','show')

      } else {
        console.log('Modal::showCards was passed an unrecognized element.')
      }
    } else {
      console.log('Modal::showCards expects an array of HTML elements.')
    }
  }

  showScore(int) {
    if (Number(int)) {
      let scorecard = document.createElement('span')
      scorecard.appendChild(document.createTextNode(int.toString()))
      scorecard.className = 'scorecard'
      this.#modalContentElement.innerHTML = ''
      this.#modalContentElement.appendChild(scorecard)
      //
      this.#appElement.className = this.#appElement.className.replace('hide','show')
    } else {
      console.log('MOdal::showScore expects an integer as an argument.')
    }
  }

  hideModal() {
    this.#appElement.className = this.#appElement.className.replace('show','hide')
    this.#modalContentElement.innerHTML = ''
  }
}
