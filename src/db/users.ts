import mongoose, { Model, Document } from "mongoose";

// Define the interface for the User document
interface UsersDocument {
    email: string;
    salt?: string;
    hash?: string;
    role?: [string];
}

const userSchema = new mongoose.Schema<UsersDocument>({

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    salt: {
        type: String,
        required: false,
    },
    hash: {
        type: String,
        required: false,
    },
    role: {
        type: String, enum: ['user', 'admin'], default: 'user',
        required: false,
    },
}, {
    timestamps: true
});

const Users = mongoose.model<UsersDocument>('Users', userSchema);

export { Users, UsersDocument }
