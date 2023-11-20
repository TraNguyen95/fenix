import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import Input from 'src/components/ui/Input'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { convertToDateString } from 'src/utils/utils'
import { formCampaignSchema } from 'src/utils/validation'

function AddCampaign() {
  const { setLoading } = useContext(AppContext)
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(formCampaignSchema)
  })
  const navigate = useNavigate()
  console.log(errors)
  const onSubmit = async (data: any) => {
    try {
      const conpaignType = [data.promotion && 'promotion_packages', data.quest && 'quests'].filter(Boolean)
      const contentCampaign = conpaignType.map((c) => {
        return { contentType: c }
      })
      const dataSend = { ...data, contentCampaign, status: 'false' }
      delete dataSend.promotion
      delete dataSend.quest

      setLoading(true)
      let result
      if (params.id) {
        result = await campaignsApi.putCampaigns(params.id, dataSend)
        result && toast.success(MESSAGE.UPDATED_SUCCESS)
      } else {
        result = await campaignsApi.postCampaigns(dataSend)
        result && toast.success(MESSAGE.CREATED_SUCCESS)
      }

      navigate('/campaigns')
    } catch (error) {
      setLoading(false)
    }
  }

  const getCampaigns = async () => {
    setLoading(true)
    const result: any = await campaignsApi.getCampaign(params.id as string)
    setValue('name', result.data.name)
    setValue(
      'promotion',
      result.data.contentCampaign.find((c: any) => c.contentType === 'promotion_packages')
    )
    setValue(
      'quest',
      result.data.contentCampaign.find((c: any) => c.contentType === 'quests')
    )
    console.log(result.data.contentCampaign.find((c: any) => c.contentType === 'quests'))
    setValue('fromDate', convertToDateString(result.data.fromDate))
    setValue('toDate', convertToDateString(result.data.toDate))
    setLoading(false)
  }

  useEffect(() => {
    if (params.id) {
      getCampaigns()
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Add Campaigns</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Add</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>CampaignName:</label>
          <Input className={inputCustom} register={register} name='name' errorMessage={errors.name?.message} />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Campaign Type</label>
          {/* <SelectOption
            label="Campaign Type"
            options={[
              { name: 'Select Campaign Type', value: '' },
              ...campangnType,
            ]}
            register={register}
            name="promotion"
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.promotion?.message as string}
          /> */}
          <div className='flex gap-2'>
            <div className='flex gap-2'>
              <label className='block text-black dark:text-white'>Promotion</label>
              <input type='checkbox' {...register('promotion')} />
            </div>
            <div className='flex items-center gap-2'>
              <label className='block text-black dark:text-white'>Quest</label>
              <input type='checkbox' {...register('quest')} />
            </div>
          </div>
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>FromDate:</label>
          <input
            {...register('fromDate')}
            type='date'
            className='custom-input-date custom-input-date-1 w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
        </div>
        {/* <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Point Range:</label>
          <Input
            className={inputCustom}
            register={register}
            name='pointRange'
            rules={getRules().tierWeight}
            errorMessage={errors.pointRange?.message}
            type='number'
          />
        </div> */}
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>ToDate:</label>
          <input
            {...register('toDate')}
            type='date'
            className='custom-input-date custom-input-date-1 w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.toDate?.message as string}</p>
        </div>
      </div>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default AddCampaign
