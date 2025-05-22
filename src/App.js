import React, { Component, useEffect, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './scss/style.scss'

import ConditionRoute from './conditionalRoute/ConditionRoute'
import ToastCAlert from './components/ToastCAlert'
import store from 'src/redux/store'
import { isLogin } from './lib/localStorage'
import { decodeJwt } from './lib/jsonWebToken'
import { getAuthToken } from './lib/localStorage'
import HelperRoute from './conditionalRoute/HelperRoute'
import AutoLogout from './components/AutoLogout'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login/Login'))
const ForgetPassword = React.lazy(() => import('./views/forget/forgetPaasword'))
const ResetPassword = React.lazy(() => import('./views/resetPassword/resetPassword'))
const ReactTable = React.lazy(() => import('./components/test/reactTable/list'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const { isAuth } = store.getState().auth
  useEffect(() => {
    if (isAuth != true && isLogin()) {
      decodeJwt(getAuthToken(), store.dispatch)
    }
  }, [])
  return (
    <BrowserRouter >
      <Suspense fallback={loading}>
        <ToastCAlert />
        <HelperRoute />
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <ConditionRoute type={'auth'}>
                <Login />
              </ConditionRoute>
            }
          />
          <Route
            exact
            path="/forgetPassword"
            name="Forget Password"
            element={
              <ConditionRoute type={'auth'}>
                {' '}
                <ForgetPassword />{' '}
              </ConditionRoute>
            }
          />
          <Route
            exact
            path="/verification/forgotPassword"
            name="Login Page"
            element={
              <ConditionRoute type={'auth'}>
                <ResetPassword />
              </ConditionRoute>
            }
          />
          <Route exact path="/reactTable" name="Register Page" element={<ReactTable />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          {/* <Route exact path="/tableTest" name="Page 500" element={<ReactTable />} /> */}
          {/* <Route exact path="/tableTest" name="Page 500" element={<TestReactTable />} /> */}
          {/* <Route exact path="/ssr-table" name="Page 500" element={<ServerSide />} /> */}

          <Route
            path="*"
            name="Home"
            element={
              <ConditionRoute type={'private'}>
                <AutoLogout>
                  <DefaultLayout />
                </AutoLogout>
              </ConditionRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
