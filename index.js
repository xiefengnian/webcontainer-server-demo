const express = require('express');
const path = require('path');
const { getProjectFiles } = require('./core');

const app = express();
const port = 3111;

const PROJECT_PATH = path.resolve(__dirname, './umi-project');

app.use(express.static(PROJECT_PATH));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get', (req, res) => {
  getProjectFiles(PROJECT_PATH).then((files) => {
    res.send(files);
  });
});

app.listen(port, () => {
  console.log(`App is live at http://localhost:${3111}`);
});
