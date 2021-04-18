import { User } from "config/types"

export default {
    User: {
        id: (parent: User) => parent._id
    }
}