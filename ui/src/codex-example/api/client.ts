import axios from 'axios'

const client = axios.create({
  baseURL: '/codex-example/api/v1'
})

export default client

