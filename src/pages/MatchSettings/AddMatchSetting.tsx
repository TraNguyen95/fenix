import { useForm, useFieldArray } from 'react-hook-form'
import CardCollapse from 'src/components/shared/CardCollapse'
import Input from 'src/components/ui/Input'
import { getRules } from 'src/utils/rules'
import { inputCustom } from 'src/utils/common.css'
import matchSettingApi from 'src/apis/matchSetting.api'
import SelectOption from 'src/components/ui/SelectOption'
import { toast } from 'react-toastify'
import { MESSAGE } from 'src/constants/message'
import { useContext, useEffect, useState } from 'react'
import rankTierApi from 'src/apis/rankTier.api'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const ROUND_TYPE = [
  { name: 'WAITING', value: 'WAITING' },
  { name: 'PLAY_AROUND', value: 'PLAY_AROUND' },
  { name: 'PUZZLE', value: 'PUZZLE' },
  { name: 'TRADING', value: 'TRADING' }
]

export default function AddMatchSetting() {
  const { setLoading } = useContext(AppContext)

  const navigate = useNavigate()
  const [tierIds, setTierIds] = useState<any>()
  const defaultValues = {
    tierId: tierIds ? tierIds[0]?.tierName : '',
    round: [
      {
        roundNo: 1,
        roundName: '',
        roundType: 'WAITING',
        mainDuration: 1,
        challenges: {
          puzzleType: 'MATCH_CALCULATION'
        },
        preparationTimeBeforeMatch: 1,
        timeRemaining: 1,
        totalChests: 1,
        totalGoldRewards: 1,
        medalRates: [
          {
            position: 1,
            goldToCost: 1,
            receivedMedals: 1
          }
        ]
      }
    ]
  }
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    shouldFocusError: false
  })
  const onSubmit = async (data: any) => {
    setLoading(true)
    const result = await matchSettingApi.postRankSettings(data)
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS)
      navigate('/match-settings', { state: { status: true }, replace: true })
    }
    setLoading(false)
  }

  const getRankTiers = async () => {
    const data: any = await rankTierApi.getRankSettings()
    setTierIds(data.data.data)
  }

  useEffect(() => {
    getRankTiers()
  }, [])

  const tierArr =
    tierIds?.map((tierID: any) => {
      return { name: tierID?.tierName, value: tierID?._id }
    }) || []

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Add Match Setting</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      {/* start  */}
      <div className='flex flex-col gap-9'>
        <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
          <div className='border-b border-stroke px-6.5 py-4 dark:border-strokedark'>
            <h3 className='text-title-md2 font-semibold text-black dark:text-white'>Add</h3>
          </div>
          <div className='p-6.5'>
            <div className='mb-4.5 flex flex-col gap-6 xl:flex-row'>
              <div className='w-full xl:w-1/2'>
                <SelectOption
                  label='Tier Name'
                  options={[{ name: 'Select Tier', value: '' }, ...tierArr]}
                  register={register}
                  name='tierId'
                  rules={getRules().RequiredCoinsItem}
                  errorMessage={errors.tierId?.message as string}
                />
              </div>
            </div>
            <Round
              {...{
                control,
                register,
                defaultValues,
                getValues,
                setValue,
                errors
              }}
            />
          </div>
        </div>
      </div>
      {/* end  */}

      <input
        className='mt-4 flex w-40 cursor-pointer justify-center rounded bg-primary py-3 font-medium text-gray'
        type='submit'
      />
    </form>
  )
}

function Round({ item, key, control, register, errors }: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'round'
  })

  const handleAddRound = (e: any) => {
    e.preventDefault()
    append({})
  }

  return (
    <div className='mb-4.5'>
      {fields.map((item: any, index) => {
        return (
          <CardCollapse
            header={`Round ${index + 1}`}
            className='round_list border-indigo-600 border'
            key={item.id}
            handleDelete={() => remove(index)}
          >
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Round No: <span className='text-meta-1'>*</span>
              </label>
              <Input
                name={`round[${index}].roundNo`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.roundNo?.message}
                rules={getRules().roundNo}
                className={inputCustom}
                placeholder='Round No'
              />
            </div>

            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Round Name: <span className='text-meta-1'>*</span>
              </label>
              <Input
                name={`round[${index}].roundName`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.roundName?.message}
                rules={getRules().RequiredCoinsItem}
                className={inputCustom}
                placeholder='Name'
              />
            </div>
            <div className='px-2 py-2'>
              <SelectOption
                label='Round Type'
                options={ROUND_TYPE}
                name={`round[${index}].roundType`}
                register={register}
                rules={getRules().RequiredCoinsItem}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.roundType?.message}
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Main Duration: <span className='text-meta-1'>*</span>
              </label>
              <Input
                type='number'
                name={`round[${index}].mainDuration`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.mainDuration?.message}
                rules={getRules().mainDuration}
                className={inputCustom}
                placeholder='Main Duration'
              />
            </div>
            <div className='px-2 py-2'>
              <SelectOption
                label='Challenges'
                options={[
                  { name: 'MATCH CALCULATION', value: 'MATCH_CALCULATION' },
                  { name: 'PICTURE PREDICTION', value: 'PICTURE_PREDICTION' },
                  { name: 'PICTURE PREDICTION', value: 'PICTURE_PREDICTION' }
                ]}
                register={register}
                name={`round[${index}].challenges.puzzleType`}
                rules={getRules().RequiredCoinsItem}
                errorMessage={errors.tierId?.puzzleType?.message}
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Preparation TimeBefore Match:
              </label>
              <Input
                name={`round[${index}].preparationTimeBeforeMatch`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.preparationTimeBeforeMatch?.message}
                className={inputCustom}
                placeholder='Preparation TimeBefore Match'
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>Time Remaining:</label>
              <Input
                type='number'
                name={`round[${index}].timeRemaining`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.timeRemaining?.message}
                className={inputCustom}
                placeholder='Time Remaining'
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>Total Gold Rewards:</label>
              <Input
                type='number'
                name={`round[${index}].totalGoldRewards`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.totalGoldRewards?.message}
                className={inputCustom}
                placeholder='Total Gold Rewards'
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>Total Chests:</label>
              <Input
                type='number'
                name={`round[${index}].totalChests`}
                register={register}
                errorMessage={Array.isArray(errors?.round) && errors.round[index]?.totalChests?.message}
                className={inputCustom}
                placeholder='Total Chests'
              />
            </div>
            {/* <MedalRates /> */}
            <div className='my-5 border-2 border-stroke'></div>

            <MetaRates nestIndex={index} {...{ control, register }} errors={errors} />
          </CardCollapse>
        )
      })}
      <button
        className='mt-2 mb-2 flex justify-center rounded bg-primary p-3 font-medium text-gray'
        onClick={handleAddRound}
      >
        Add Round
      </button>
    </div>
  )
}

const MetaRates = ({ nestIndex, control, register, errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `round[${nestIndex}].medalRates`
  })
  useEffect(() => {
    remove(0)
  }, [])

  return (
    <>
      {fields.map((item: any, k) => {
        return (
          <CardCollapse key={item.id} header='medal Rates' handleDelete={() => remove(k)} className={'mx-6'}>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Position: <span className='text-meta-1'>*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].position`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.position?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder='Position'
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Gold To Cost: <span className='text-meta-1'>*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].goldToCost`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.goldToCost?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder='GoldToCost'
              />
            </div>
            <div className='px-2 py-2'>
              <label className='mb-2.5 block font-semibold text-black dark:text-white'>
                Received Medals: <span className='text-meta-1'>*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].receivedMedals`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.receivedMedals?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder='Received Medals'
              />
            </div>
          </CardCollapse>
        )
      })}
      <button
        type='button'
        className='mx-6 mt-2 mb-2 flex justify-center rounded bg-primary p-3 font-medium text-gray'
        onClick={() => append({})}
      >
        Add Metal Rate
      </button>
    </>
  )
}
