import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import Exception from './errors/Exception';
import routes from './routes/index.routes';

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Exception) {
    return res.status(400).json(err);
  }

  console.log(err);

  res
    .status(500)
    .json({ status: 'error', code: 500, message: 'internal server error' });
});

app.listen(port, () => {
  console.log(`☕ API is running on port ${port}`);
});
