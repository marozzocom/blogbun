import routes from './routes'
import type { Handler, PathParams } from './types'
import { notFound } from './utilities'

const router = (request: Request) => {
  // Process the request URL
  const { pathname, searchParams } = new URL(request.url)
  const requestPathSegments = pathname.split('/').filter(Boolean)

  // Check for a matching route
  const { matchedHandler, extractedParams } = routes.reduce<{
    matchedHandler: Handler | null
    extractedParams: PathParams
  }>(
    (matchedRoute, currentRoute) => {
      if (matchedRoute.matchedHandler) return matchedRoute

      const currentRouteSegments = currentRoute.url.split('/').filter(Boolean)

      // Return previous matched route if the number of segments don't match
      if (currentRouteSegments.length !== requestPathSegments.length) {
        return matchedRoute
      }

      // Extract path parameters
      const extractedPathParams = currentRouteSegments.reduce<Record<
        string,
        string
      > | null>((pathParamsAcc, routeSegment, index) => {
        if (!pathParamsAcc) return null

        const requestSegment = requestPathSegments[index]

        // Extract path parameters for dynamic segments
        if (routeSegment.startsWith(':')) {
          pathParamsAcc[routeSegment.slice(1)] = requestSegment
          return pathParamsAcc
        }

        // If the route segment is static and doesn't match the request, return null
        if (routeSegment !== requestSegment) {
          return null
        }

        return pathParamsAcc
      }, {})

      // Use extracted parameters to update matchedRoute only if they exist
      return extractedPathParams
        ? {
            matchedHandler: currentRoute.handler,
            extractedParams: extractedPathParams,
          }
        : matchedRoute
    },
    { matchedHandler: null, extractedParams: {} },
  )

  // Return the matched (or not found) handler
  return matchedHandler
    ? matchedHandler({ request, pathParams: extractedParams, searchParams })
    : notFound
}

export default router
