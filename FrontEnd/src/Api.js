const axios = require('axios').default;

export const api = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL 
})