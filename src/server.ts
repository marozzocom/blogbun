import { getResponse } from './utilities'
import router from './router'

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
