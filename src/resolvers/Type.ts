import { User } from "config/types"

const User = {
    id: (parent: User) => parent._id
}

export default {
    User
}