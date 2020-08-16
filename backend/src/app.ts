import express from 'express';
import * as mysql from 'mysql';
import cors from 'cors';

const port = process.env.PORT;

const mysqlConnectionConfig: mysql.ConnectionConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const connection = mysql.createConnection(mysqlConnectionConfig);
connection.connect();

const app = express();
const router = express.Router();

app.use(cors());
app.use('/api/v1', router);

router.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

router.get('/cities', (req, res) => {
  const idsQuery = req.query.ids as string;
  const ids = idsQuery.split(',');

  const mysqlQuery = `
    SELECT
      cities.id,
      cities.name,
      states.name AS 'state_name',
      countries.name AS 'country_name',
      countries.phonecode
    FROM cities 
    LEFT JOIN states
      ON states.id = cities.state_id
    LEFT JOIN countries
      ON countries.id = states.country_id
    WHERE cities.id in (?)
  `;

  connection.query(mysqlQuery, [ids], (error, result, fields) => {
    if (error) {
      console.error(error);
    }
    res.send(result);
  });
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});