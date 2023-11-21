import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import shopApi from 'src/apis/shop.api'
import Input from 'src/components/ui/Input'
import SelectOption from 'src/components/ui/SelectOption'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { convertToDateString } from 'src/utils/utils'
import { formCampaignSchema, formShopSchema } from 'src/utils/validation'

function DetailShop() {
  const [campaigns, setCampaigns] = useState<any[]>()
  const { setLoading } = useContext(AppContext)
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(formShopSchema)
  })
  const navigate = useNavigate()
  console.log(errors)
  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      setLoading(true)
      let result
      if (params.id) {
        result = await shopApi.putShop(params.id, data)
        result && toast.success(MESSAGE.UPDATED_SUCCESS)
      } else {
        result = await shopApi.postShop(data)
        result && toast.success(MESSAGE.CREATED_SUCCESS)
      }
      // navigate('/shops')
    } catch (error) {
      setLoading(false)
    }
  }

  const getShop = async () => {
    setLoading(true)
    const result: any = await shopApi.getShop(params.id as string)
    setValue('campaignId', result.data.campaignId)
    setValue('price', convertToDateString(result.data.price))
    setValue('pplAmount', convertToDateString(result.data.pplAmount))
    setLoading(false)
  }

  useEffect(() => {
    if (params.id) {
      getShop()
    }
  }, [])

  const getCampaign = async () => {
    const result: any = await campaignsApi.getCampaigns()
    const campaignFilter = result.data.campaigns.map((c: any) => {
      return { name: c.name, value: c._id }
    })
    setCampaigns(campaignFilter)
  }

  useEffect(() => {
    getCampaign()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>{params.id ? 'Edit Shop' : 'Add Shop'}</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>{params.id ? 'Edit' : 'Add'}</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <SelectOption
            label='campaignId'
            options={[{ name: 'Select campaignID', value: '' }, ...(campaigns || [])]}
            register={register}
            name='campaignId'
            errorMessage={errors.campaignId?.message as string}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Price:</label>
          <input
            {...register('price')}
            type='number'
            className='custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.price?.message as string}</p>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>pplAmount:</label>
          <input
            {...register('pplAmount')}
            type='number'
            className='custom-input-date custom-input-date-1 w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.pplAmount?.message as string}</p>
        </div>
      </div>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default DetailShop
