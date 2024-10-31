import express, { Request,Response} from 'express'
import { createApp } from './config/express';

const app = createApp();

const port = 3000;

// Middleware to handle JSON
app.use(express.json())

app.get('/', (req:Request, res:Response) => {
    res.send("hello world setup pipeline :D second try!")
})




app.listen(port, () => {
    console.log(`Server running at port http://localhost:${port}`)
})