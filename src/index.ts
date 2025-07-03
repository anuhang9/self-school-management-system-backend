import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectionDb } from './db/connectionDb';
import router from './routes/schoolAdminRoutes.route';

const app = express()
dotenv.config()
const PORT = process.env.PORT || 8000;

app.use(express.json())

app.get('/', (req: Request, res: Response)=>{
    res.send("this is root route. ");
})

app.use('/school-admin', router)

app.listen(PORT, ()=>{
    connectionDb();
    console.log("servers has started :", PORT);
})