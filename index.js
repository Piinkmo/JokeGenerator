const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/get-joke', async (req, res) => {
  const name = req.body.name;
  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
    let joke = response.data.joke || `${response.data.setup} ... ${response.data.delivery}`;
    joke = joke.replace(/Chuck Norris/g, name);
    res.render('joke', { joke });
  } catch (error) {
    console.error(error);
    res.render('error', { error: 'Error fetching joke. Please try again later.' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
