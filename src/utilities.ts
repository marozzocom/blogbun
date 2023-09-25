const getResponse = (
  body: unknown,
  status: number = body == null ? 404 : 200,
  headers = {
    'Content-Type': 'application/json',
  },
) =>
  new Response(
    body == null
      ? JSON.stringify({ message: 'not found' })
      : JSON.stringify(body),
    { status, headers },
  )

const notFound = getResponse(null)

export { getResponse, notFound }
