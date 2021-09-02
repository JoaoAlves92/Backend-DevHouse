import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from 'cors';
import SessionController from "./controller/SessionController";
import HouseController from "./controller/HouseController";
import DashboardController from "./controller/DashboardController";
import ReservaController from './controller/ReservaController';
import multer from "multer";
import uploadConfig from "./config/upload";


const app = express()

//MIDDLEWARES
app.use(cors())
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

mongoose.connect(`mongodb+srv://admin:${process.env.SECRET}@cluster1.gsz1u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const upload = multer(uploadConfig)

//Cadastro e login
app.post('/session', SessionController.store)

//Houses
app.post('/house', upload.single('imagem'), HouseController.store)
app.get('/house', HouseController.index)
app.put('/house/:house_id', upload.single('imagem'), HouseController.update)
app.delete('/house/:house_id', HouseController.destroy)

//Dashboard
app.get('/dashboard', DashboardController.show)

//Reserva
app.post('/house/:house_id/reserva', ReservaController.store)
app.get('/reserva', ReservaController.index)
app.delete('/reserva/cancel', ReservaController.destroy)

app.listen(3222)