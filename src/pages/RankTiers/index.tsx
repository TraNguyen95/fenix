import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import rankSettingApi from "src/apis/rankTier.api";
import IconDelete from "src/components/ui/IconDelete";
import Input from "src/components/ui/Input";
import { MESSAGE } from "src/constants/message";
import { AppContext } from "src/contexts/app.context";
import { inputCustom } from "src/utils/common.css";
import ButtonWithIcon from "../UiElements/ButtonWithIcon";

function RankSetting() {
  const navigate = useNavigate()
  const [isDelete, setIsDelete] = useState<Boolean>(false)
  const { setLoading } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = Number(searchParams.get('page')) || 1;
  let search = searchParams.get('search') || ""
  console.log('search', search)
  const [rankSettings, setRankSettings] = useState<any>()
  const getRankSettings = async () => {
    setLoading(true)
    const data: any = await rankSettingApi.getRankSettings(currentPage, search);
    setRankSettings(data)
    setLoading(false)
  }
  useEffect(() => {
    getRankSettings();
  }, [currentPage, isDelete, search]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const handleSearch = () => {
    console.log('handleSearch');
  }

  const onSubmit = async (data: any) => {
    console.log(data)
    navigate(`/rank-tiers?page=${currentPage}&search=${data.search}`);
  };

  if(!rankSettings) return;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>List Rank Tier</title>
        <link rel="canonical" href="" />
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <span className="text-title-md2 font-semibold text-black">
          Rank Setting
        </span>
        <ButtonWithIcon name="Add new" className="mb-5 mt-5" path={`add`} />
      </div>

      <form
        className="flex gap-2 items-center mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="text-title-sm font-semibold text-black">Search</span>
        <input
          {...register('search')}
          className={`rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary  ml-2`}
          placeholder="Search Season"
        />
        <button
          className="nline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>

      <TableRankSetting
        list={rankSettings.data}
        currentPage={currentPage}
        setIsDelete={setIsDelete}
        setSearchParams={setSearchParams}
        isDelete={isDelete}
      />
    </div>
  );
}

export default RankSetting;

const TableRankSetting = (props: any) => {
  const { setLoading } = useContext(AppContext);
  const PAGE_SIZE = 10;
  const handlePage = (page: number) => {
    props.setSearchParams({page})
  }
  const handleDelete = async (id : string) => {
    const conf = confirm(MESSAGE.ARE_SURE_DELETE);
    if(!conf) return;
    setLoading(true)
    const result = await rankSettingApi.deleteRankSetting(id)
    if(result) toast.success(MESSAGE.DELETED_SUCCESS)
    props.setIsDelete(!props.isDelete);
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11 font-semibold">
                Season
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white font-semibold">
                TierName
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white font-semibold">
                Medal
              </th>
              {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th> */}
              <th className="py-4 px-4 font-medium text-black dark:text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {props.list?.data.map((item: any, index: number) => {
              return (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="text-black dark:text-white">{item.season}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item.tierName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                      {item.numberOfMedal}
                    </p>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                      {item.createdAt}
                    </p>
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link to={`${item._id}`} className="hover:text-primary">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Link>
                      <button
                        className="hover:text-primary"
                        onClick={() => handleDelete(item._id)}
                      >
                        <IconDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-4"
        >
          <ul className="inline-flex -space-x-px text-sm mx-auto">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {Array(Math.ceil(props.list.total / PAGE_SIZE))
              .fill(0)
              .map((_: any, index) => {
                return (
                  <li key={index}>
                    <a
                      onClick={() => handlePage(index + 1)}
                      className={
                        (props.currentPage == index + 1
                          ? 'bg-[#3b50e0] text-[#fff] border-[#3b50e0]'
                          : '') +
                        ' flex items-center justify-center px-3 h-8 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                      }
                    >
                      {index + 1}
                    </a>
                  </li>
                );
              })}
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
