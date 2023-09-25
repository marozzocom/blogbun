import { Database } from 'bun:sqlite'
import { getResponse } from './utilities'
import router from './router'

const BASE_URL = String(process.env.BASE_URL)
const db = new Database('blog.sqlite')

Bun.serve({
  hostname: '::',
  port: process.env.PORT,
  fetch: async (request) => {
    try {
      return router(request)
    } catch (error) {
      console.error('An error occurred:', error)
      return getResponse({ message: 'internal server error' }, 500)
    }
  },
})

export { BASE_URL, db }
