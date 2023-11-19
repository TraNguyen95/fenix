import { Suspense, lazy, useEffect, useState, useContext } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ECommerce from './pages/Dashboard/ECommerce'
import SignIn from './pages/Authentication/SignIn'
import SignUp from './pages/Authentication/SignUp'
import routes from './routes'
import Loader from './common/Loader'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

function App() {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 400)
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path='/' element={<RejectedRoute />}>
          <Route path='/auth/signin' element={<SignIn />} />
          <Route path='/auth/signup' element={<SignUp />} />
        </Route>
        <Route path='/' element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route path='/' index element={<ECommerce />} />
            {routes.map(({ path, component: Component }, index: number) => (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                }
              />
            ))}
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/auth/signin' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' /> 
}
