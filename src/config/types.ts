import { ObjectID } from "mongodb"

export interface User {
    _id: ObjectID
    name: String
    date: Date
}