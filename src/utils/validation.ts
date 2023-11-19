import * as yup from 'yup'

const addPromotionSchema = yup.object({
  price: yup.number().typeError('Price is required'),
  pplAmount: yup.number().typeError('pplAmount is required')
})

export { addPromotionSchema }
