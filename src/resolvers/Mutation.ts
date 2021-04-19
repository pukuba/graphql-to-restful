import { Db } from "mongodb"

export default {
    insertUser: async (
        parent: void, {
            name
        }: {
            name: string
        }, {
            db
        }: {
            db: Db
        }
    ) => await db.collection("user").insertOne({
        name,
        date: new Date()
    }).then(({ ops }) => ops[0])
}