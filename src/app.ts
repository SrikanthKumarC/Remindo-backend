import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}

export default app; 