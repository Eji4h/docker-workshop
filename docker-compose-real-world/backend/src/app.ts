import cors from 'cors';
import express, { RequestHandler } from 'express';
import { MongoClient } from 'mongodb';

import { dbName, mongoUrl, port } from './config.env';

const client = new MongoClient(mongoUrl);

const main = async () => {
  const app = express();
  const router = express.Router();
  app.use(cors());
  app.use('/api/v1', router);

  router.get('/', (_, res) => {
    res.send('The sedulous hyena ate the antelope!');
  });

  router.get('/cities', (async (req, res) => {
    await client.connect();
    const idsQuery = req.query.ids as string;
    const ids = idsQuery.split(',').map((id) => parseInt(id));

    const col = client.db(dbName).collection('cities');
    const result = await col
      .aggregate([
        { $match: { id: { $in: ids } } },
        {
          $project: {
            id: 1,
            name: 1,
            state_id: 1,
            country_id: 1,
          },
        },
        {
          $lookup: {
            from: 'states',
            localField: 'state_id',
            foreignField: 'id',
            as: 'state',
          },
        },
        {
          $unwind: '$state',
        },
        {
          $lookup: {
            from: 'countries',
            localField: 'country_id',
            foreignField: 'id',
            as: 'country',
          },
        },
        {
          $unwind: '$country',
        },
        {
          $project: {
            _id: 0,
            id: '$id',
            name: '$name',
            stateName: '$state.name',
            countryName: '$country.name',
            phoneCode: '$country.phone_code',
          },
        },
      ])
      .toArray();
    client.close();
    res.send(result);
  }) as RequestHandler);

  router.get('/cities/count', (async (_, res) => {
    await client.connect();
    const col = client.db(dbName).collection('cities');
    const result = await col.countDocuments();
    client.close();
    res.send({
      count: result,
    });
  }) as RequestHandler);

  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
};

main().finally(() => {
  client.close();
});
