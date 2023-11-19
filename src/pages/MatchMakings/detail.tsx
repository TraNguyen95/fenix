import { useContext, useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import matchMakingApi from 'src/apis/matchMaking.api'
import Input from 'src/components/ui/Input'
import { MESSAGE } from 'src/constants/message'
import { AppContext } from 'src/contexts/app.context'
import { inputCustom } from 'src/utils/common.css'
import { getRules } from 'src/utils/rules'

function DeailMatchMaking() {
  const { setLoading } = useContext(AppContext)

  const params = useParams()
  const navigate = useNavigate()
  const [matchMaking, setMatchMaking] = useState<any>()
  const onSubmit = async (data: any) => {
    setLoading(true)
    const result = await matchMakingApi.putMatchMakings(params?.id as string, data)
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS)
      navigate('/match-makings')
    }
    setLoading(false)
  }

  const getMatchMaking = async () => {
    setLoading(true)
    const result: any = await matchMakingApi.getMatchMaking(params.id as string)
    setMatchMaking(result.data)
    setLoading(false)
  }

  useEffect(() => {
    getMatchMaking()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    values: {
      tierWeight: matchMaking?.tierWeight,
      medalWeight: matchMaking?.medalWeight,
      winLossWeight: matchMaking?.winLossWeight,
      timeToUpRange: matchMaking?.timeToUpRange,
      pointRange: matchMaking?.pointRange
    }
  })

  console.log('matchMaking', matchMaking)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Edit Match Making</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <h3 className='font-medium text-black dark:text-white'>Edit</h3>
        </div>
        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Tier Weight:</label>
          <Input
            className={inputCustom}
            register={register}
            name='tierWeight'
            rules={getRules().tierWeight}
            errorMessage={errors.tierWeight?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>Medal Weight:</label>
          <Input
            className={inputCustom}
            register={register}
            name='medalWeight'
            rules={getRules().tierWeight}
            errorMessage={errors.medalWeight?.message}
          />
        </div>

        <div className='border-b border-stroke py-4 px-6.5 dark:border-strokedark'>
          <label className='mb-3 block font-semibold text-black dark:text-white'>WinLoss Weight:</label>
          <Input
            className={inputCustom}
            register={register}
            name='winLossWeight'
            rules={getRules().tierWeight}
            errorMessage={errors.winLossWeight?.message}
            type='number'
          />
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
          <label className='mb-3 block font-semibold text-black dark:text-white'>Time To Up Range:</label>
          <Input
            className={inputCustom}
            register={register}
            name='timeToUpRange'
            rules={getRules().timeToUpRange}
            errorMessage={errors.timeToUpRange?.message}
            type='number'
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

export default DeailMatchMaking
