'use strict'

const Hapi = require('hapi')
const Inert = require('inert')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: '0.0.0.0'
})

const start = async () => {
  await server.register(Inert)

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.file('index.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/{micro_app}/{path*}',
    handler: (request, h) => {
      const micro_app = request.params.micro_app;
      const path = request.params.path;

      /* {domain}/*.[js|css] */
      if (micro_app.includes('.')) { return h.file(micro_app) }
      /* {domain}/{micro_app} */
      if (!micro_app.includes('.') && !path) { return h.file('index.html') }
      /* {domain}/{micro_app}/{path*} */
      if (!micro_app.includes('.') && path && !path.includes('.')) { return h.file('index.html') }
      /* {domain}/{micro_app}/*.[js|css] */
      if (!micro_app.includes('.') && path && path.includes('.')) { return h.file(`${micro_app}/${path}`) }
      /* 404 fallback to foundation app */
      return h.file('index.html')
    }
  })

  await server.start()

  console.log('Server running at:', server.info.uri)
}

start()
