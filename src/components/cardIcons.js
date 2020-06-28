import { amex, discover, mastercard, visa, creditcard } from './assets'

// https://github.com/muffinresearch/payment-icons
const cardIconMap = {
  VISA: visa,
  MC: mastercard,
  DISC: discover,
  AMEX: amex,
  OTHER: creditcard,
}

export default cardIconMap
