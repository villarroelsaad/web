import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { session } from './config.js'


dotenv.config();
const port = 3000;

const app = express();

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session)

app.listen(port, () => {
    console.log('Server running on port 3000')
})