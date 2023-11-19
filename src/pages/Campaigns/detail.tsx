import { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import Input from 'src/components/ui/Input'
import SelectOption from 'src/components/ui/SelectOption'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'
import { convertToDateString } from 'src/utils/utils'

function DetailCampaigns() {
  const { setLoading } = useContext(AppContext)
  const [promotions, setPromotions] = useState<any[]>([])
  const params = useParams()
  const navigate = useNavigate()
  const [campaign, setCampaign] = useState<any>()
  const onSubmit = async (data: any) => {
    console.log(data)
    setLoading(true)
    try {
      const result = await campaignsApi.putCampaigns(params?.id as string, data)
      if (result) {
        toast.success(MESSAGE.CREATED_SUCCESS)
        navigate('/campaigns')
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const getCampaigns = async () => {
    setLoading(true)
    const result: any = await campaignsApi.getCampaign(params.id as string)
    console.log('result', result)
    setCampaign(result.data)
    setLoading(false)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    values: {
      campaignName: campaign?.campaignName,
      campaignType: campaign?.campaignType,
      fromDate: convertToDateString(campaign?.fromDate),
      toDate: convertToDateString(campaign?.toDate)
    }
  })

  const getPromotions = async () => {
    // const data: any = await promotionApi.getPromotions();

    const res: any[] = [
      { _id: 1, packageName: 'PackageName1' },
      { _id: 2, packageName: 'PackageName2' }
    ]
    setPromotions(res)
  }
  console.log(errors)

  useEffect(() => {
    getPromotions()
  }, [])

  const campangnType = [
    { name: 'promotion_packages', value: 'promotion_packages' },
    { name: 'quests', value: 'quests' }
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Detail Campaigns</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Edit</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Campaign Name:</label>
          <Input
            className={inputCustom}
            register={register}
            name='campaignName'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.campaignName?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <SelectOption
            defaultV={campaign?.campaignType}
            label='Campaign Type'
            options={[{ name: 'Select Campaign Type', value: '' }, ...campangnType]}
            register={register}
            name='campaignType'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.campaignType?.message as string}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>From Date:</label>
          <input
            {...register('fromDate', getRules().RequiredCoinsItem)}
            type='date'
            className='custom-input-date custom-input-date-1 w-[150px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>To Date:</label>
          <input
            {...register('toDate', getRules().RequiredCoinsItem)}
            type='date'
            className='custom-input-date custom-input-date-1 w-[150px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
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

export default DetailCampaigns
