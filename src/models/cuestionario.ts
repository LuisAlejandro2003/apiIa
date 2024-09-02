import { Schema, model } from 'mongoose';

const userSchema: Schema = new Schema(
    {
        userId: {
            type: String
        },
        NombreUsuario: {
            type: String
        },
        TelefonoUsuario: {
            type: String
        },
    }
);

export default model('user', userSchema);