import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'teste'
})

app.listen({ port: 8080 }).then(() => {
  console.log('HTTP server running!')
})
