import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const registerUser        = (data)     => API.post('/auth/register', data)
export const loginUser           = (data)     => API.post('/auth/login', data)
export const getTransactions     = ()         => API.get('/transactions')
export const getSummary          = ()         => API.get('/transactions/summary')
export const createTransaction   = (data)     => API.post('/transactions', data)
export const updateTransaction   = (id, data) => API.put(`/transactions/${id}`, data)
export const deleteTransaction   = (id)       => API.delete(`/transactions/${id}`)
