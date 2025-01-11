import httpService from './http'
import { AxiosResponse } from 'axios' // Import AxiosResponse if you're using axios
import contactInterface from '../types/contactInterface'

export const filteredContactAPI = async (
  query: string
): Promise<AxiosResponse<contactInterface[]>> => {
  try {
    const response = await httpService.get(`/contacts/filter-by-name?search=${query}`)
    return response
  } catch (error) {
    throw error
  }
}

export const searchContactAPI = async (query: string): Promise<AxiosResponse<contactInterface>> => {
  try {
    const response = await httpService.get(`/contacts/search-by-name?search=${query}`)
    return response
  } catch (error) {
    throw error
  }
}
