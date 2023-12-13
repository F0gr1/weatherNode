// app.js

const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
require('dotenv').config();
// EJSをテンプレートエンジンとして使用
app.set('view engine', 'ejs');

// 静的ファイルの配信
app.use(express.static('public'));

// ルートエンドポイント
app.get('/', (req, res) => {
  res.render('index');
});

// 天気情報を取得するエンドポイント
app.get('/weather', async (req, res) => {
  const apiKey = process.env.key1;
  const city = req.query.city || 'Tokyo'; // デフォルトは東京
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const weatherData = response.data;
    console.log(response.data); 
    res.json({
      city: weatherData.name,
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
