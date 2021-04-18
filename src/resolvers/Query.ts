import { Db } from "mongodb";

export default {
    test: () => "Server On!",
    users: async (parent: void, args: void, { db }: { db: Db }) => await db.collection("user").find({}).toArray(),
    searchUser: async (parent: void, { name }: { name: String }, { db }: { db: Db }) => await db.collection("user").find({ name }).toArray()
}