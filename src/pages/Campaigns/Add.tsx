import { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import Input from 'src/components/ui/Input'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'

function AddCampaign() {
  const { setLoading } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      console.log(data)
      // setLoading(true)
      // const result = await campaignsApi.postCampaigns(data)
      // if (result) {
      //   toast.success(MESSAGE.CREATED_SUCCESS)
      //   navigate('/campaigns')
      // }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Add Campaigns</title>
        <link rel='canonical' href='' />
      </Helmet>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Add</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>CampaignName:</label>
          <Input
            className={inputCustom}
            register={register}
            name='campaignName'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.campaignName?.message}
          />
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
              <label className='block font-semibold text-black dark:text-white'>Promotion</label>
              <input type='checkbox' {...register('promotion')} />
              <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
            </div>
            <div className='flex items-center gap-2'>
              <label className='block font-semibold text-black dark:text-white'>Quest</label>
              <input type='checkbox' {...register('quest')} />
              <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
            </div>
          </div>
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>FromDate:</label>
          <input
            {...register('fromDate', getRules().RequiredCoinsItem)}
            type='date'
            className='custom-input-date custom-input-date-1 w-1/2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
          />
          <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Point Range:</label>
          <Input
            className={inputCustom}
            register={register}
            name='pointRange'
            rules={getRules().tierWeight}
            errorMessage={errors.pointRange?.message}
            type='number'
          />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>ToDate:</label>
          <input
            {...register('toDate', getRules().RequiredCoinsItem)}
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
