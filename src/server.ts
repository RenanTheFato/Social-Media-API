import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { routes } from "./routes";

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

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
    },
    transform: jsonSchemaTransform,
  })

  await server.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })

  await server.register(routes)

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

start()