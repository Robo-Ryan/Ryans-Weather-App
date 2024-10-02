import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
// POST /api/weather
router.post('/', (_req: Request, res: Response) => {
  res.json({ message: 'POST /api/weather/:city' });
})
  // TODO: GET weather data from city name
  // TODO: save city to search history

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  res.json({ message: 'GET /api/weather/history' });
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {
  res.json({ message: 'DELETE /api/weather/history/:id' });
});

export default router; 
