import cors from 'cors';
import express from 'express';

import { port } from './config.env';

let count = 0;

const main = async () => {
  const app = express();
  const router = express.Router();

  app.use(cors());
  app.use('/api/v1', router);

  router.get('/', (_, res) => {
    const response = `KBTG Docker counter: ${++count} times`;
    res.send(response);
  });

  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
};

main();
