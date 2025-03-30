// components/Weather.tsx
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const apikey = "feff206daa60b539abe8fae8f2ab7f29";

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

interface ForecastData {
  list: {
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: {
      description: string;
    }[];
  }[];
}

const Weather = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
        fetchWeatherData(url);
      });
    }
  }, []);

  const fetchWeatherData = async (url: string) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData(data);
      fetchForecastData(data.name);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchForecastData = async (cityName: string) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apikey}`;
    try {
      const response = await axios.get(url);
      setForecastData(response.data);
      console.log("response" , response);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
    }
  };

  const searchByCity = async () => {
    if (city) {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
      fetchWeatherData(url);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="header flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-500 underline">Weather Monitoring Dashboard</h1>
        <div className="flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="p-2 rounded-lg border"
          />
          <button onClick={searchByCity} className="bg-cadetblue text-white p-2 rounded-lg ml-2">
            Search
          </button>
        </div>
      </div>

      {weatherData && forecastData ? (
        <main className="grid grid-cols-3 gap-4">
          <div className="weather text-center text-white">
            <h2 className="text-xl">{`${weatherData.name}, ${weatherData.sys.country}`}</h2>
            <p className="text-3xl">{Math.floor(weatherData.main.temp - 273)}°C</p>
            <p className="text-lg">{weatherData.weather[0].description}</p>
            <img
              src={`http://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt={weatherData.weather[0].description}
              className="w-16 h-16"
            />
          </div>

          <div className="forecast">
            <p className="font-semibold text-white">Upcoming Hourly Forecast</p>
            <div className="hourly-forecast space-y-4">
              {forecastData.list.slice(0, 5).map((forecast) => {
                const date = new Date(forecast.dt * 1000);
                return (
                  <div key={forecast.dt} className="flex justify-between text-white">
                    <div>{date.toLocaleTimeString()}</div>
                    <div>{Math.floor(forecast.main.temp_max - 273)}°C / {Math.floor(forecast.main.temp_min - 273)}°C</div>
                    <div>{forecast.weather[0].description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      ) : (
        <p className="text-center text-white">Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;
