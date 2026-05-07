import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/codex-example/api/v1'

const client = axios.create({
  baseURL
})

export default client
