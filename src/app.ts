import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}

export default app; 