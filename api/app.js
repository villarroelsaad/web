import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { session } from './config.js'
import { routerUser } from './routes/rUser.js'
import { routerSale } from './routes/rSales.js';
import { routerPay } from './routes/rPay.js'
import { routerClient } from './routes/rClient.js'


dotenv.config();
const port = 3000;

const app = express();

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session)


app.use('/user', routerUser)
app.use('/pay', routerPay)
app.use('/client', routerClient)
app.use('/sale', routerSale)

app.listen(port, () => {
    console.log('Server running on port 3000')
})