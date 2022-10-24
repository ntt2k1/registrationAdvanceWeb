import express  from 'express';
import mongoose from 'mongoose';
import authRouter from "./routes/AuthRoutes.js"
import ENV from 'dotenv';
const PORT = 4000;

// .env
ENV.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log('Connect DB successfully');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server start on http://localhost:${PORT}`));
