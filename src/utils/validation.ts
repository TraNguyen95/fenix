import * as yup from 'yup'

const addPromotionSchema = yup.object({
  price: yup.number().typeError('Price is required'),
  pplAmount: yup.number().typeError('pplAmount is required')
})

const formCampaignSchema = yup.object({
  name: yup.string().required('CampaignName is required'),
  fromDate: yup.string().required('FromDate is required'),
  toDate: yup.string().required('ToDate is required'),
})
export { addPromotionSchema, formCampaignSchema }
