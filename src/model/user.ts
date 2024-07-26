import { Users, UsersDocument } from "../db/users";

enum UserRoles {
    Admin = "admin",
    User = "user"
}

class User extends Users {
    // Define the register method with the correct data type
    static async register(doc: UsersDocument): Promise<UsersDocument> {
        // Save the user data to the database
        return await new Users(doc).save()
    }
    static async findOneByEmail<T>(email: string) {
        return await Users.findOne<T>({ email })
    }
    static async findOneByID<T>(_id: string) {
        return await Users.findOne({ _id })
    }
}

export { UserRoles, User };
