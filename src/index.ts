import { Database } from 'bun:sqlite'
import { getResponse } from './utilities'
import router from './router'

const BASE_URL = 'http://localhost:3030'
const db = new Database('blog.sqlite')

Bun.serve({
  port: 3030,
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
