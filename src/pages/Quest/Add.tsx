import { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import questApi from 'src/apis/quest.api'
import IconDelete from 'src/components/ui/IconDelete'
import Input from 'src/components/ui/Input'
import SelectOption from 'src/components/ui/SelectOption'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'
import campaignsApi from 'src/apis/campaigns.api'

function AddQuest() {
  const { setLoading } = useContext(AppContext)
  const [campaigns, setCampaigns] = useState<any[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm()

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'rewards'
  })
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    console.log(data)
    setLoading(true)
    const result = await questApi.postQuest(data)
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS)
      navigate('/quest')
    }
    setLoading(false)
  }

  const getCampaigns = async () => {
    const data: any = await campaignsApi.getCampaigns()
    console.log(data)
    setCampaigns(data?.data.campaigns)
  }

  useEffect(() => {
    getCampaigns()
  }, [])
  const campaignsArr = campaigns.map((campaign) => {
    return { name: campaign.campaignName, value: campaign._id }
  })

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
          <SelectOption
            label='campaignID'
            options={[{ name: 'Select campaignID', value: '' }, ...campaignsArr]}
            register={register}
            name='campaignID'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.campaignID?.message as string}
          />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Week:</label>
          <Input
            className={inputCustom}
            register={register}
            name='week'
            rules={getRules().week}
            errorMessage={errors.week?.message}
            type='number'
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Day:</label>
          <Input
            type='number'
            className={inputCustom}
            register={register}
            name='day'
            rules={getRules().week}
            errorMessage={errors.day?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Rewards:</label>
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index) => (
            <div className='mb-2 flex items-center gap-3' key={id}>
              <div className=''>
                <input
                  {...register(`rewards[${index}].coin`, getRules().RequiredCoinsItem)}
                  placeholder='coin'
                  className={inputCustom}
                  type='text'
                />
                {Array.isArray(errors.rewards) && errors.rewards[index]?.coin && (
                  <p className='text-red-600 mt-2'>{errors.rewards[index]?.coin.message}</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`rewards[${index}].quantity`, getRules().costToBuyQuantity)}
                  placeholder='quantity'
                  className={inputCustom}
                  type='number'
                />
                {Array.isArray(errors.rewards) && errors.rewards[index]?.quantity && (
                  <p className='text-red-600 mt-2'>{errors.rewards[index]?.quantity.message}</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`rewards[${index}].min`, getRules().costToBuyQuantity)}
                  placeholder='min'
                  defaultValue={quantity}
                  className={inputCustom}
                  type='number'
                />
                {Array.isArray(errors.rewards) && errors.rewards[index]?.min && (
                  <p className='text-red-600 mt-2'>{errors.rewards[index]?.min.message}</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`rewards[${index}].max`, getRules().costToBuyQuantity)}
                  placeholder='max'
                  defaultValue={quantity}
                  className={inputCustom}
                  type='number'
                />
                {Array.isArray(errors.rewards) && errors.rewards[index]?.max && (
                  <p className='text-red-600 mt-2'>{errors.rewards[index]?.min.message}</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`rewards[${index}].openRate`, getRules().costToBuyQuantity)}
                  placeholder='openRate'
                  defaultValue={quantity}
                  className={inputCustom}
                  type='number'
                />
                {Array.isArray(errors.rewards) && errors.rewards[index]?.openRate && (
                  <p className='text-red-600 mt-2'>{errors.rewards[index]?.openRate.message}</p>
                )}
              </div>
              <button className='fhover:text-primary' type='button' onClick={() => remove(index)}>
                <IconDelete />
              </button>
            </div>
          ))}
          {/* dynamic form field  */}
          <a
            type='submit'
            className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            onClick={() => append({})}
          >
            Add
          </a>
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>iLocked:</label>
          <input type='checkbox' {...register('iLocked')} />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Cost To Unlock:</label>
          <div className='flex gap-2'>
            <div className='w-1/3'>
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name='costToUnlock.coin'
                rules={getRules().RequiredCoinsItem}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage={errors.costToUnlock?.coin?.message}
                placeholder='coin'
              />
            </div>
            <div className='w-1/3'>
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name='costToUnlock.quantity'
                rules={getRules().costToBuyQuantity}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage={errors.costToUnlock?.quantity?.message}
                placeholder='quantity'
              />
            </div>
          </div>
        </div>
      </div>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default AddQuest
