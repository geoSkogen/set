class Modal {

  #appElement = {}
  #modalContentElement = {}
  #closeModalElement = {}
  #modalBackdrop = {}
  #openModalElement = {}

  constructor() {
    const SELF = this
    this.#appElement = document.getElementById('appModal')
    this.#modalContentElement = document.getElementById('modalContent')
    this.#closeModalElement = document.getElementById('closeModal')
    this.#modalBackdrop = document.getElementById('modalBackdrop')
    this.#openModalElement = null

    document.body.addEventListener('keydown', function (event) {
      if (event.code==='Escape') {
        if (!JSON.parse(SELF.#appElement.getAttribute('aria-hidden'))) {
          SELF.hideModal()
        }
      }
    })
  }

  /**
  * @return DOM Element
  */
  get modalContentElement() {
    return this.#modalContentElement
  }

  /**
  * @return DOM Element
  */
  get closeModalElement() {
    return this.#closeModalElement
  }

  /**
  * @param array - an array of DOM Elements
  * @return void
  */
  showCards(card_element_arr) {

    if (!Array.isArray(card_element_arr)) {
      console.log('Modal::showCards expects an array as an argument.')
      return []
    }

    let cards = []

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
      this.#appElement.setAttribute('aria-hidden','false')
      this.#appElement.className = this.#appElement.className.replace('hide','show')
      this.#modalBackdrop.className = this.#modalBackdrop.className.replace('hide','show')

    } else {
      console.log('Modal::showCards was passed an unrecognized element in its argument array.')
    }
  }

  /**
  * @param integer int
  * @param string button_id
  * @return void 
  */
  showScore(int,button_id) {

    if (typeof int != 'number') {
      console.log('MOdal::showScore expects an integer as argument 1.')
      return
    }

    if (typeof button_id != 'string') {
      console.log('MOdal::showScore expects a string as argument 2.')
      return
    }


    let scorecard = document.createElement('span')
    scorecard.appendChild(document.createTextNode(int.toString()))
    scorecard.className = 'scorecard'
    scorecard.setAttribute('tabindex','-1')
    this.#modalContentElement.innerHTML = ''
    this.#modalContentElement.appendChild(scorecard)
    this.#appElement.setAttribute('aria-hidden','false')
    this.#appElement.className = this.#appElement.className.replace('hide','show')
    this.#modalBackdrop.className = this.#modalBackdrop.className.replace('hide','show')

    if (document.getElementById(button_id)) {
      this.#openModalElement = document.getElementById(button_id)
      this.#openModalElement.setAttribute('aria-expanded','true')
    }
    scorecard.focus()
  }

  hideModal() {
    this.#appElement.setAttribute('aria-hidden','true')
    this.#appElement.className = this.#appElement.className.replace('show','hide')
    this.#modalBackdrop.className = this.#modalBackdrop.className.replace('show','hide')
    this.#modalContentElement.innerHTML = ''
    if (this.#openModalElement) {
      this.#openModalElement.setAttribute('aria-expanded','false')
      this.#openModalElement.focus()
    }
  }
}
