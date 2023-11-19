import { useForm, useFieldArray } from 'react-hook-form'
import rankSettingApi from 'src/apis/rankTier.api'
import { inputCustom } from 'src/utils/common.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MESSAGE } from 'src/constants/message'
import Input from 'src/components/ui/Input'
import { getRules } from 'src/utils/rules'
import { AppContext } from 'src/contexts/app.context'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function DetailRankSetting() {
  const { setLoading } = useContext(AppContext)
  const params = useParams()
  const [rankSetting, setRankSetting] = useState<any>()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm<any>({
    values: {
      season: rankSetting?.season,
      tierName: rankSetting?.tierName,
      numberOfMedal: rankSetting?.numberOfMedal,
      coins: rankSetting?.coins
    }
  })
  const getRankSetting = async () => {
    setLoading(true)
    const result: any = await rankSettingApi.getRankSetting(params.id as string)
    setRankSetting(result.data.data)
    setLoading(false)
  }

  useEffect(() => {
    getRankSetting()
  }, [])

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'coins',
    rules: { required: true }
  })

  const onSubmit = async (data: any) => {
    setLoading(true)
    try {
      const result = await rankSettingApi.putRankSettings(params.id || '', data)
      if (result?.data) {
        toast.success(MESSAGE.UPDATED_SUCCESS)
        setLoading(false)
        navigate('/rank-tiers')
      }
    } catch (error) {
      setLoading(false)
    }
  }

  if (!rankSetting) return
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Edit Rank Tier</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Edit</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Season:</label>
          <Input
            className={inputCustom}
            register={register}
            name='season'
            rules={getRules().season}
            errorMessage={errors.season?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Tier Name:</label>
          <Input
            className={inputCustom}
            register={register}
            name='tierName'
            rules={getRules().season}
            errorMessage={errors.tierName?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Number Of Medal:</label>
          <Input
            className={inputCustom}
            register={register}
            name='numberOfMedal'
            rules={getRules().numberOfMedal}
            errorMessage={errors.numberOfMedal?.message}
            type='number'
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Coins:</label>
          {errors.coins?.root?.type === 'required' && <p className='text-red-600 mt-2'>This field is required</p>}
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index: number) => (
            <div className='mb-2 flex items-start gap-3' key={id}>
              <div className=''>
                <input
                  {...register(`coins[${index}].coin`, getRules().RequiredCoinsItem)}
                  placeholder='coin'
                  className={inputCustom}
                  defaultValue={coin}
                  type='text'
                />
                {Array.isArray(errors.coins) && errors.coins[index]?.coin && (
                  <p className='text-red-600 mt-2'>This field is required</p>
                )}
              </div>
              <div className=''>
                <input
                  {...register(`coins[${index}].quantity`, getRules().RequiredCoinsItem)}
                  placeholder='quantity'
                  className={inputCustom}
                  type='number'
                />
                <p className='text-red-600 mt-2'>{errors.coins?.root?.message as string}</p>
              </div>
              <button className='mt-3' type='button' onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}
          {/* dynamic form field  */}
          <a
            type='submit'
            className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
            onClick={() => append({ coin: '', quantity: 0 })}
          >
            Add
          </a>
        </div>
      </div>
      <input
        type='submit'
        className='mt-2 inline-flex cursor-pointer items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10'
      />
    </form>
  )
}

export default DetailRankSetting
