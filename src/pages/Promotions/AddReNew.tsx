import { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import promotionApi from 'src/apis/promotion.api'
import Input from 'src/components/ui/Input'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { addPromotionSchema } from 'src/utils/validation'

function AddPromotionRenew() {
  const { setLoading } = useContext(AppContext)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(addPromotionSchema)
  })

  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    console.log(data)
    // setLoading(true)
    // const result = await promotionApi.postPromotion(data)
    // if (result) {
    //   toast.success(MESSAGE.CREATED_SUCCESS)
    //   navigate('/promotions')
    // }
    // setLoading(false)
  }

  const getCampaigns = async () => {
    const data: any = await campaignsApi.getCampaigns()
    console.log(data)
    setCampaigns(data?.data.campaigns)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Add Promotion Packages</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Add</h3>
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Price:</label>
          <Input
            type='number'
            className={inputCustom}
            register={register}
            name='price'
            errorMessage={errors.price?.message}
          />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>pplAmount:</label>
          <Input
            type='number'
            className={inputCustom}
            register={register}
            name='pplAmount'
            errorMessage={errors.pplAmount?.message}
          />
        </div>
      </div>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default AddPromotionRenew
