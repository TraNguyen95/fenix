import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import questApi from 'src/apis/quest.api';
import IconDelete from 'src/components/ui/IconDelete';
import Input from 'src/components/ui/Input';
import SelectOption from 'src/components/ui/SelectOption';
import { MESSAGE } from 'src/constants/message';
import { AppContext } from 'src/contexts/app.context';
import { inputCustom } from 'src/utils/common.css';
import { getRules } from 'src/utils/rules';
import campaignsApi from 'src/apis/campaigns.api';

function DetailQuest() {
  const { setLoading } = useContext(AppContext);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [quest, setQuest] = useState<any>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>({
    values: {
      campaignID: quest?.campaignID,
      week: quest?.week,
      day: quest?.day,
      rewards: quest?.rewards,
      iLocked: quest?.iLocked,
      costToUnlock: quest?.costToUnlock,
    },
  });

  const params = useParams();

  const getQuest = async () => {
    const res: any = await questApi.getQuest(params.id as string);
    setQuest(res?.data);
  };

  useEffect(() => {
    getQuest();
  }, []);

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'rewards',
  });
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    console.log(data);
    setLoading(true);
    const result = await questApi.putQuest(params.id as string, data);
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS);
      navigate('/quest');
    }
    setLoading(false);
  };

  const getCampaigns = async () => {
    const data: any = await campaignsApi.getCampaigns();
    console.log(data);
    setCampaigns(data?.data.campaigns);
  };

  useEffect(() => {
    getCampaigns();
  }, []);
  const campaignsArr = campaigns.map((campaign) => {
    return { name: campaign.campaignName, value: campaign._id };
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Detail Quest</title>
        <link rel="canonical" href="" />
      </Helmet>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add</h3>
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <SelectOption
            label="campaignID"
            options={[
              { name: 'Select campaignID', value: '' },
              ...campaignsArr,
            ]}
            register={register}
            name="campaignID"
            rules={getRules().RequiredCoinsItem}
            errorMessage={errors.campaignID?.message as string}
          />
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Week:
          </label>
          <Input
            className={inputCustom}
            register={register}
            name="week"
            rules={getRules().week}
            errorMessage={errors.week?.message}
            type="number"
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Day:
          </label>
          <Input
            type="number"
            className={inputCustom}
            register={register}
            name="day"
            rules={getRules().week}
            errorMessage={errors.day?.message}
          />
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Rewards:
          </label>
          {/* dynamic */}
          {fields.map(({ id, coin, quantity }: any, index) => (
            <div className="flex gap-3 mb-2 items-center" key={id}>
              <div className="">
                <input
                  {...register(
                    `rewards[${index}].coin`,
                    getRules().RequiredCoinsItem,
                  )}
                  placeholder="coin"
                  className={inputCustom}
                  type="text"
                />
                {Array.isArray(errors.rewards) &&
                  errors.rewards[index]?.coin && (
                    <p className="text-red-600 mt-2">
                      {errors.rewards[index]?.coin.message}
                    </p>
                  )}
              </div>
              <div className="">
                <input
                  {...register(
                    `rewards[${index}].quantity`,
                    getRules().costToBuyQuantity,
                  )}
                  placeholder="quantity"
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.rewards) &&
                  errors.rewards[index]?.quantity && (
                    <p className="text-red-600 mt-2">
                      {errors.rewards[index]?.quantity.message}
                    </p>
                  )}
              </div>
              <div className="">
                <input
                  {...register(
                    `rewards[${index}].min`,
                    getRules().costToBuyQuantity,
                  )}
                  placeholder="min"
                  defaultValue={quantity}
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.rewards) &&
                  errors.rewards[index]?.min && (
                    <p className="text-red-600 mt-2">
                      {errors.rewards[index]?.min.message}
                    </p>
                  )}
              </div>
              <div className="">
                <input
                  {...register(
                    `rewards[${index}].max`,
                    getRules().costToBuyQuantity,
                  )}
                  placeholder="max"
                  defaultValue={quantity}
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.rewards) &&
                  errors.rewards[index]?.max && (
                    <p className="text-red-600 mt-2">
                      {errors.rewards[index]?.min.message}
                    </p>
                  )}
              </div>
              <div className="">
                <input
                  {...register(
                    `rewards[${index}].openRate`,
                    getRules().costToBuyQuantity,
                  )}
                  placeholder="openRate"
                  defaultValue={quantity}
                  className={inputCustom}
                  type="number"
                />
                {Array.isArray(errors.rewards) &&
                  errors.rewards[index]?.openRate && (
                    <p className="text-red-600 mt-2">
                      {errors.rewards[index]?.openRate.message}
                    </p>
                  )}
              </div>
              <button
                className="fhover:text-primary"
                type="button"
                onClick={() => remove(index)}
              >
                <IconDelete />
              </button>
            </div>
          ))}
          {/* dynamic form field  */}
          <a
            type="submit"
            className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={() => append({})}
          >
            Add
          </a>
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            iLocked:
          </label>
          <input type="checkbox" {...register('iLocked')} />
          <p className="text-red-600 mt-2">
            {errors.fromDate?.message as string}
          </p>
        </div>
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white font-semibold">
            Cost To Unlock:
          </label>
          <div className="flex gap-2">
            <div className="w-1/3">
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name="costToUnlock.coin"
                rules={getRules().RequiredCoinsItem}
                // @ts-ignore
                errorMessage={errors.costToUnlock?.coin?.message}
                placeholder="coin"
              />
            </div>
            <div className="w-1/3">
              <Input
                className={
                  'w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary'
                }
                register={register}
                name="costToUnlock.quantity"
                rules={getRules().costToBuyQuantity}
                // @ts-ignore
                errorMessage={errors.costToUnlock?.quantity?.message}
                placeholder="quantity"
              />
            </div>
          </div>
        </div>
      </div>
      <input
        type="submit"
        className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      />
    </form>
  );
}

export default DetailQuest;
