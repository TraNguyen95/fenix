import axios, { AxiosError, type AxiosInstance } from 'axios'
import HttpStatusCode from 'src/constants/httpStatusCode.enum'
import { toast } from 'react-toastify'
import { AuthResponse } from 'src/types/auth.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          console.log('data', data)
          this.accessToken = data.data.accessToken
          // this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          // setRefreshTokenToLS(this.refreshToken)
          setProfileToLS({ username: data.data.userName })
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          clearLS()
        }
        return response?.data
      },
      (error: AxiosError) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

        // Nếu là lỗi 401
        // if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
        //   const config = error.response?.config || { headers: {}, url: '' }
        //   const { url } = config
        //   // Trường hợp Token hết hạn và request đó không phải là của request refresh token
        //   // thì chúng ta mới tiến hành gọi refresh token
        //   if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
        //     // Hạn chế gọi 2 lần handleRefreshToken
        //     this.refreshTokenRequest = this.refreshTokenRequest
        //       ? this.refreshTokenRequest
        //       : this.handleRefreshToken().finally(() => {
        //           // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
        //           setTimeout(() => {
        //             this.refreshTokenRequest = null
        //           }, 10000)
        //         })
        //     return this.refreshTokenRequest.then((access_token) => {
        //       // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
        //       return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
        //     })
        //   }

        //   // Còn những trường hợp như token không đúng
        //   // không truyền token,
        //   // token hết hạn nhưng gọi refresh token bị fail
        //   // thì tiến hành xóa local storage và toast message

        //   clearLS()
        //   this.accessToken = ''
        //   this.refreshToken = ''
        //   toast.error(error.response?.data.data?.message || error.response?.data.message)
        //   // window.location.reload()
        // }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
