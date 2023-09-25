# blogbun

Extremely simple example of a blog API made with bun

This demonstrates
- use of [SQLite with Bun](src/routes.ts)
- use of Bun as [HTTP server](src/index.ts)
- how to implement a tiny [router](src/router.ts) that supports path and search params

To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

Navigate to
- /posts
- /post/:id
- /post/:id/comments

This project was created using `bun init` in bun v1.0.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
