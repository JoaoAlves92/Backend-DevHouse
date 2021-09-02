import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
    imagem: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
})

HouseSchema.virtual('imagem_url').get(function(){
    return `http://localhost:3222/files/${this.imagem}`
})

export default model('House', HouseSchema);