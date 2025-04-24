import express from 'express';
import cors from 'cors'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';



dotenv.config();
const port = 3000;

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, () => {
    console.log('Server running on port 3000')
})