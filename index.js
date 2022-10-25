import express  from 'express';
import MongoDb from './utils/mongoConnect.js'
import authRouter from "./routes/AuthRoutes.js"
import cors from 'cors'
import ENV from 'dotenv';
const PORT = 4000;

// .env
ENV.config()

//Connect DB
MongoDb();

const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('VERSION 1.5');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
