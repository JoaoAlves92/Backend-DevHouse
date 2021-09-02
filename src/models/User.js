import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: String,
    nome: String
})

export default model('User', UserSchema)