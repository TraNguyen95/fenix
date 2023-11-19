import { Helmet, HelmetProvider } from 'react-helmet-async'
import CardFour from 'src/components/shared/CardFour'
import CardOne from 'src/components/shared/CardOne'
import CardThree from 'src/components/shared/CardThree'
import CardTwo from 'src/components/shared/CardTwo'
import ChartOne from 'src/components/shared/ChartOne'
// import ChartThree from 'src/components/shared/ChartThree'
// import ChartTwo from 'src/components/shared/ChartTwo'
// import ChatCard from 'src/components/shared/ChatCard'
// import MapOne from 'src/components/shared/MapOne'
// import TableOne from 'src/components/shared/TableOne'

const ECommerce = () => {
  return (
    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <title>Home Page</title>
            <link rel='canonical' href='' />
          </Helmet>
        </div>
      </HelmetProvider>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        {/* <ChartOne /> */}
        {/* <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
        <ChatCard /> */}
      </div>
    </>
  )
}

export default ECommerce
