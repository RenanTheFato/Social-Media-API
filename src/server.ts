import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

const server = fastify()

async function start(){

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  await server.register(fastifyCors, { origin: '*' })
  await server.register(fastifySwagger, {
    openapi : {
      info: {
        title: 'Social Media API',
        version: '1.0.0',
      }
    }
  })

  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })


  try {
    await server.listen({
      host: '0.0.0.0',
      port: 3333
    }).then(() => {
      console.log('Server Running on port 3333!')
    })
  } catch (error) {
    console.log(`The server could not be started: ${error}`)
  }
}