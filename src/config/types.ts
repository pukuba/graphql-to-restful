import { ObjectID } from "bson";

export interface User {
    _id: ObjectID
    name: String
    date: Date
}