import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import campaignsApi from 'src/apis/campaigns.api'
import dailyBonusConfigApi from 'src/apis/dailyBonusConfigApi'
import CardCollapse from 'src/components/shared/CardCollapse'
import Input from 'src/components/ui/Input'
import SelectOption from 'src/components/ui/SelectOption'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'
import { formDailyBonusSchema } from 'src/utils/validation'

function DetailDailyBoususConfig() {
  const { setLoading } = useContext(AppContext)
  const [campaigns, setCampaigns] = useState<any[]>()
  const params = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    resolver: yupResolver(formDailyBonusSchema)
  })
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'bonus'
  })
  const navigate = useNavigate()
  console.log(errors)
  const onSubmit = async (data: any) => {
    try {
      console.log('data', data)
      setLoading(true)
      let result
      if (params.id) {
        result = await dailyBonusConfigApi.putDailyBonus(params.id, data)
        result && toast.success(MESSAGE.UPDATED_SUCCESS)
      } else {
        result = await dailyBonusConfigApi.postDailyBonus(data)
        result && toast.success(MESSAGE.CREATED_SUCCESS)
      }

      navigate('/daily-bonus-config')
    } catch (error) {
      setLoading(false)
    }
  }

  const getDailyBonus = async () => {
    setLoading(true)
    const result: any = await dailyBonusConfigApi.getDailyBonus(params.id as string)
    setValue('campaignId', result.data.campaignId)
    setValue('bonus', result.data.bonus)
    setValue('totalRenec', result.data.totalRenec)
    setValue('claimedRenec', result.data.claimedRenec)
    setLoading(false)
  }

  const getCampaign = async () => {
    const result: any = await campaignsApi.getCampaigns()
    const campaignFilter = result.data.campaigns.map((c: any) => {
      return { name: c.name, value: c._id }
    })
    setCampaigns(campaignFilter)
  }

  useEffect(() => {
    if (params.id) {
      getDailyBonus()
    }
    getCampaign()
  }, [])

  const handleAddRound = (e: any) => {
    e.preventDefault()
    append({})
  }

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
          <label className='mb-3 block font-semibold text-black dark:text-white'>totalRenec:</label>
          <Input
            className={inputCustom}
            register={register}
            name='totalRenec'
            errorMessage={errors.totalRenec?.message}
          />
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>claimedRenec:</label>
          <Input
            className={inputCustom}
            register={register}
            name='claimedRenec'
            errorMessage={errors.claimedRenec?.message}
            type='number'
          />
        </div>
        <div className='mb-4.5 px-6.5 py-4'>
          {fields.map((item: any, i) => {
            return (
              <CardCollapse
                header={`bonus ${i + 1}`}
                className='round_list border-indigo-600 border'
                key={item.id}
                handleDelete={() => remove(i)}
              >
                <div className='px-2 py-2'>
                  <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                    ppl: <span className='text-meta-1'>*</span>
                  </label>
                  <Input
                    name={`bonus[${i}].ppl.amount`}
                    register={register}
                    rules={getRules().roundNo}
                    errorMessage={Array.isArray(errors?.bonus) && errors.bonus[i]?.ppl?.amount?.message}
                    className={inputCustom}
                    placeholder='amount'
                  />
                  <Input
                    name={`bonus[${i}].ppl.possibility`}
                    register={register}
                    errorMessage={Array.isArray(errors?.bonus) && errors.bonus[i]?.ppl?.possibility?.message}
                    className={inputCustom}
                    placeholder='possibility'
                  />
                </div>
                <div className='px-2 py-2'>
                  <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                    renec: <span className='text-meta-1'>*</span>
                  </label>
                  <Input
                    name={`bonus[${i}].renec.amount`}
                    register={register}
                    errorMessage={Array.isArray(errors?.bonus) && errors.bonus[i]?.renec?.amount?.message}
                    className={inputCustom}
                    placeholder='amount'
                  />
                  <Input
                    name={`bonus[${i}].renec.possibility`}
                    register={register}
                    errorMessage={Array.isArray(errors?.bonus) && errors.bonus[i]?.renec?.possibility?.message}
                    className={inputCustom}
                    placeholder='possibility'
                  />
                </div>
                <div className='flex items-center gap-2 px-2 py-2'>
                  <label className='block font-semibold text-black dark:text-white'>isChest</label>
                  <input type='checkbox' {...register(`bonus[${i}].isChest`)} />
                </div>
                <div className='px-2 py-2'>
                  <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                    price: <span className='text-meta-1'>*</span>
                  </label>
                  <Input
                    name={`bonus[${i}].price`}
                    register={register}
                    errorMessage={Array.isArray(errors?.bonus) && errors.bonus[i]?.price?.message}
                    className={inputCustom}
                    placeholder='price'
                    type='number'
                  />
                </div>
              </CardCollapse>
            )
          })}
        </div>
      </div>
      <button
        className='mt-2 mb-2 flex justify-center rounded bg-primary p-3 font-medium text-gray'
        onClick={handleAddRound}
      >
        Add Bonus
      </button>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default DetailDailyBoususConfig
