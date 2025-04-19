import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './app/middleware/notFound';
import router from './app/routes';
const app: Application = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

//not found route
app.use(notFound);

export default app;
