import { Database } from 'bun:sqlite'
import type { Route, Post, Comment } from './types'
import { getResponse } from './utilities'

const db = new Database('blog.sqlite')

const routes: Array<Route> = [
  {
    url: 'posts',
    handler: () =>
      getResponse(
        db.query<Post, []>('SELECT id, title, content FROM posts').all(),
      ),
  },
  {
    url: 'post/:id',
    handler: ({ pathParams }) =>
      getResponse(
        db
          .query<Post, { $id: string }>(
            'SELECT title, content FROM posts WHERE id = $id;',
          )
          .get({ $id: pathParams.id }),
      ),
  },
  {
    url: 'post/:id/comments',
    handler: ({ pathParams }) =>
      getResponse(
        db
          .query<Comment, { $id: string }>(
            'SELECT comment FROM comments WHERE post = $id',
          )
          .all({ $id: pathParams.id }),
      ),
  },
]

export default routes
