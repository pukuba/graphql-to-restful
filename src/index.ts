import express from "express"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { bodyParserGraphQL } from "body-parser-graphql"
import { graphqlHTTP } from "express-graphql"
import { useSofa, OpenAPI } from "sofa-api"
import { readFileSync } from "fs"

import resolvers from "resolvers"
const typeDefs = readFileSync("src/typeDefs.graphql", "utf-8")

const app = express()
app.use(bodyParserGraphQL())
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

app.use(
    useSofa({
        basePath: '',
        schema
    })
)

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

app.listen(5252, () => {
    console.log(`http://localhost:5252`)
})
