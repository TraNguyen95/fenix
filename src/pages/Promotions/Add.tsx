import { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import promotionApi from 'src/apis/promotion.api'
import IconDelete from 'src/components/ui/IconDelete'
import Input from 'src/components/ui/Input'
import SelectOption from 'src/components/ui/SelectOption'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'

function AddPromotion() {
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
    name: 'packageDetail'
  })
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    console.log(data)
    setLoading(true)
    const result = await promotionApi.postPromotion(data)
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS)
      navigate('/promotions')
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
      <Helmet>
        <meta charSet='utf-8' />
        <title>Add Promotion Packages</title>
        <link rel='canonical' href='' />
      </Helmet>
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
          <label className='mb-3 block font-semibold text-black dark:text-white'>Package Name:</label>
          <Input
            className={inputCustom}
            register={register}
            name='packageName'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.packageName?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Package Order:</label>
          <Input
            type='number'
            className={inputCustom}
            register={register}
            name='packageOrder'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.packageOrder?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>PackageDetail:</label>
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index) => (
            <div className='mb-2 flex items-center gap-3' key={id}>
              <div className=''>
                <input
                  {...register(`packageDetail[${index}].coin`, getRules().RequiredCoinsItem)}
                  placeholder='coin'
                  className={inputCustom}
                  defaultValue={coin}
                  type='text'
                />
                {Array.isArray(errors.packageDetail) && errors.packageDetail[index]?.coin && (
                  <p className='text-red-600 mt-2'>{errors.packageDetail[index]?.coin.message}</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`packageDetail[${index}].quantity`, getRules().costToBuyQuantity)}
                  placeholder='quantity'
                  defaultValue={quantity}
                  className={inputCustom}
                  type='number'
                />
                {Array.isArray(errors.packageDetail) && errors.packageDetail[index]?.quantity && (
                  <p className='text-red-600 mt-2'>{errors.packageDetail[index]?.quantity.message}</p>
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
          <label className='mb-3 block font-semibold text-black dark:text-white'>Quantity:</label>
          <Input
            type='number'
            className={inputCustom}
            register={register}
            name='quantity'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.quantity?.message}
          />
          <p className='text-red-600 mt-2'>{errors.fromDate?.message as string}</p>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <SelectOption
            label='HasRibbon'
            options={[
              { name: 'Select HasRibbon', value: '' },
              { name: 'None', value: 'none' },
              { name: 'Popular', value: 'popular' },
              { name: 'Best-offer', value: 'best-offer' }
            ]}
            register={register}
            name='hasRibbon'
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.hasRibbon?.message as string}
          />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Cost To Buy:</label>
          <div className='flex gap-2'>
            <div className='w-1/3'>
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name='costToBuy.coin'
                rules={getRules().RequiredCoinsItem}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage={errors.costToBuy?.coin?.message}
                placeholder='coin'
              />
            </div>
            <div className='w-1/3'>
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name='costToBuy.quantity'
                rules={getRules().costToBuyQuantity}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                errorMessage={errors.costToBuy?.quantity?.message}
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

export default AddPromotion
