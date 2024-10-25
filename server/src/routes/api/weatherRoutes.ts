import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// POST /api/weather
router.post('/', (req: Request, res: Response) => {
  try {
    let city = req.body.cityName;
    WeatherService.getWeatherForCity(city).then((data) => {
      HistoryService.addCity(city);
      res.status(200).json(data);
    })
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
})
  // TODO: GET weather data from city name
  // GET /api/weather?cityName=city
  // TODO: save city to search history

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    let history = await HistoryService.getCities();
    res.status(200).json(history);
  }
  catch (error) {
    res.status(500).json({ message: error });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {
  res.json({ message: 'DELETE /api/weather/history/:id' });
});

export default router; 
