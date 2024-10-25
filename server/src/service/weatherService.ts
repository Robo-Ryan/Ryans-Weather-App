import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  //properties
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  windSpeed: number;
  humidity: number;

  //constructor
  constructor(city: string, date: string, icon: string, description: string, temp: number, humidity: number, wind: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = description;
    this.tempF = temp;
    this.windSpeed = wind;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  //PROPERTIES
  private baseURL?: string | undefined;
  private apiKey?: string | undefined;
  private city = "";

  //CONSTRUCTOR
  constructor() {
    this.baseURL = process.env.API_BASE_URL;
    this.apiKey = process.env.API_KEY;
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    console.log("response", response);
    let data: Coordinates[] = await response.json();
    return data[0];
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    console.log(locationData);
    let { lat, lon } = locationData;
    let coordinates: Coordinates = { lat, lon };
    return coordinates;
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${this.city}&appid=${this.apiKey}`;
  }
 
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }

  // // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    const data = await response.json();
    return data;
  }
  // // TODO: Build parseCurrentWeather method
  private async parseCurrentWeather(response: any) {
    const data = response.list[0];
    const currentWeather = new Weather(
      this.city,
      data.dt_txt.split(" ")[0],
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp,
      data.wind.speed,
      data.main.humidity,
    );
    return currentWeather;
  }
  // // TODO: Complete buildForecastArray method
  private buildForecastArray( weatherData: any[]) {
    let filteredForecast = weatherData.filter((data) => {
      return data.dt_txt.includes("12:00:00");
    })
    let forecastArray = filteredForecast.map((data) => {
      return new Weather(
        this.city,
        data.dt_txt.split(" ")[0],
        data.weather[0].icon,
        data.weather[0].description,
        data.main.temp,
        data.main.humidity,
        data.wind.speed,
      );
    });
    return forecastArray;
  }
  // // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
  
    // Parse current weather
    const currentWeather = await this.parseCurrentWeather(weatherData);
  
    // Assuming weatherData has a 'list' or similar structure for the forecast data
    const forecastArray = this.buildForecastArray(weatherData.list); // Adjust 'list' based on your API
  
    
    return { currentWeather, forecastArray };
  }
}

export default new WeatherService();
