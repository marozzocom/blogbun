import { BASE_URL } from '.'
import routes from './routes'
import type { Handler, PathParams } from './types'
import { notFound } from './utilities'

const router = (request: Request) => {
  const [path, search] = request.url.replace(BASE_URL, '').split('?')
  const pathSegments = path.split('/').filter(Boolean)
  const searchParams = new URLSearchParams(search)

  const { handler, pathParams } = routes.reduce<{
    handler: Handler | null
    pathParams: PathParams
  }>(
    (acc, route) => {
      if (acc.handler) return acc

      const routeSegments = route.url.split('/').filter(Boolean)
      if (routeSegments.length !== pathSegments.length) return acc

      const pathParams = routeSegments.reduce<Record<string, string> | null>(
        (paramsAcc, segment, index) => {
          if (!paramsAcc) return null
          if (segment.startsWith(':')) {
            paramsAcc[segment.slice(1)] = pathSegments[index]
          } else if (segment !== pathSegments[index]) {
            return null
          }
          return paramsAcc
        },
        {},
      )

      return pathParams ? { handler: route.handler, pathParams } : acc
    },
    { handler: null, pathParams: {} },
  )

  return handler ? handler({ request, pathParams, searchParams }) : notFound
}

export default router
