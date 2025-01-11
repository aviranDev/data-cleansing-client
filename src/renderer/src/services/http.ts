import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage'
import { jwtDecode } from 'jwt-decode'
import { refreshtoken } from './user'

const API_URL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true // Include credentials for all requests

export interface DecodedToken {
  exp: number
  data: object
  // Add any other properties your token might have
}

// Create an Axios instance
const instance = axios.create({
  baseURL: API_URL, // Set your API base URL here if needed
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})
console.log('API_URL: ', API_URL)

// Request interceptor to add auth token
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getLocalStorage<string | null>('accessToken', null)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error)
  }
)

const refreshAccessToken = async (): Promise<string> => {
  try {
    // Make a request to the refresh token endpoint
    const response = await refreshtoken()
    const decodedUser = jwtDecode<DecodedToken>(response)
    setLocalStorage('user', decodedUser)
    setLocalStorage('accessToken', response)
    return response
  } catch (error) {
    removeLocalStorage('accessToken')
    removeLocalStorage('user')
    window.location.href = '/login'
    throw error
  }
}

const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      // Check if the cookie is present
      const jwtCookie = getCookie('jwt')
      if (!jwtCookie) {
        console.log('Cookie is missing, logging out...')
        removeLocalStorage('accessToken')
        removeLocalStorage('user')
        return Promise.reject(error)
      }

      console.log('Cookie is located')
      try {
        const newToken = await refreshAccessToken()
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        console.log('re-login')
        return axios(originalRequest)
      } catch (err) {
        removeLocalStorage('accessToken')
        removeLocalStorage('user')
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

// Export the HTTP methods
const httpService = {
  get: instance.get,
  post: instance.post,
  patch: instance.patch,
  put: instance.put,
  delete: instance.delete
}

export default httpService
