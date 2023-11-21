import * as yup from 'yup'

const addPromotionSchema = yup.object({
  price: yup.number().typeError('Price is required'),
  pplAmount: yup.number().typeError('pplAmount is required')
})

const formCampaignSchema = yup.object({
  name: yup.string().required('CampaignName is required'),
  fromDate: yup.string().required('FromDate is required'),
  toDate: yup.string().required('ToDate is required')
})

const formShopSchema = yup.object({
  campaignId: yup.string().required('campaignId is required'),
  price: yup.string().required('price is required'),
  pplAmount: yup.string().required('pplAmount is required'),
})

const bonusSchema = {
  ppl: yup.object({
    amount: yup.string().required('ppl.amount is required'),
    possibility: yup.string().required('ppl.possibility is required')
  }),
  renec: yup.object({
    amount: yup.string().required('renec.amount is required'),
    possibility: yup.string().required('renec.possibility is required')
  }),
  price: yup.string().required('price is required')
}

const formDailyBonusSchema = yup.object({
  campaignId: yup.string().required('campaignId is required'),
  totalRenec: yup.string().required('totalRenec is required'),
  claimedRenec: yup.string().required('claimedRenec is required'),
  bonus: yup.array().of(yup.object().shape(bonusSchema))
})

export { addPromotionSchema, formCampaignSchema, formDailyBonusSchema, formShopSchema }
