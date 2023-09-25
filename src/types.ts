type PathParams = Record<string, string>

type HandlerArgs = {
  request: Request
  pathParams: PathParams
  searchParams: URLSearchParams
}

type Handler = (args: HandlerArgs) => Response

type Route = {
  method?: 'GET' | 'POST'
  url: string
  handler: Handler
}

type Post = {
  id: number
  title: string
  content: string
}

type Comment = {
  id: number
  post: number
  comment: string
}

export type { PathParams, HandlerArgs, Handler, Route, Post, Comment }
