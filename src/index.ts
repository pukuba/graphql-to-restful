import env from "dotenv"
env.config()

import express from "express"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { bodyParserGraphQL } from "body-parser-graphql"
import { graphqlHTTP } from "express-graphql"
import { useSofa, OpenAPI } from "sofa-api"
import { readFileSync } from "fs"
import expressPlayground from "graphql-playground-middleware-express"
import DB from "config/connectDB"

import resolvers from "resolvers"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()
const start = async () => {
    app.use(bodyParserGraphQL())
    const db = await DB.get()
    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    })

    app.use(
        useSofa({
            basePath: '/api',
            schema,
            context() {
                return {
                    db
                }
            }
        })
    )

    app.use(
        "/api",
        graphqlHTTP({
            schema,
            context: {
                db
            }
        })
    )
    app.get("/graphql", expressPlayground({ endpoint: "/api" }))

    app.listen(5252, () => {
        console.log(`http://localhost:5252/graphql`)
    })

}

start()