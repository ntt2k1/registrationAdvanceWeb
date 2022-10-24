import express  from 'express';
import MongoDb from './utils/mongoConnect.js'
import authRouter from "./routes/AuthRoutes.js"
import ENV from 'dotenv';
const PORT = 4000;

// .env
ENV.config()

//Connect DB
MongoDb();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
