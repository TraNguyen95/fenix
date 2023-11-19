import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import matchMakingApi from 'src/apis/matchMaking.api';
import Input from 'src/components/ui/Input';
import { MESSAGE } from 'src/constants/message';
import { AppContext } from 'src/contexts/app.context';
import { inputCustom } from 'src/utils/common.css';
import { getRules } from 'src/utils/rules';

function AddMatchMaking() {
  const { setLoading } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    setLoading(true);
    const result = await matchMakingApi.postMatchMakings(data);
    if(result) {
      toast.success(MESSAGE.CREATED_SUCCESS);
      navigate('/match-makings');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Match Making</title>
        <link rel="canonical" href="" />
      </Helmet>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add</h3>
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Tier Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="tierWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.tierWeight?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Medal Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="medalWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.medalWeight?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            WinLoss Weight:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="winLossWeight"
            rules={getRules().tierWeight}
            errorMessage={errors.winLossWeight?.message}
            type="number"
          />
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Point Range:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="pointRange"
            rules={getRules().tierWeight}
            errorMessage={errors.pointRange?.message}
            type="number"
          />
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Time To Up Range:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="timeToUpRange"
            rules={getRules().timeToUpRange}
            errorMessage={errors.timeToUpRange?.message}
            type="number"
          />
        </div>
      </div>
      <input
        type="submit"
        className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      />
    </form>
  );
}

export default AddMatchMaking;
