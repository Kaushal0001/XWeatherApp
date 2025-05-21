import { useState } from "react";
import "./Weather.css";

const Weather = () => {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        if (!city) {
            return;
        }

        setLoading(true);
        setWeatherData(null);

        try {
            const apiKey = '6ef0dafed1a848d1b9372935252005';
            const responce = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            if (!responce.ok) {
                throw new Error('City not found');
            }
            const data = await responce.json();
            setWeatherData({
                temperature: data.current.temp_c,
                humidity: data.current.humidity,
                condition: data.current.condition.text,
                windSpeed: data.current.wind_kph
            });
        } catch (error) {
            alert('Failed to fetch weather data');
        }
        finally {
            setLoading(false);
        }

    };

    return (
        <div className="container" >
            <input type="text"
                value={city}
                placeholder="Enter city name"
                onChange={(e) => setCity(e.target.value)} />
            <button onClick={fetchWeather}>Search</button>
            {loading && <p>Loading data...</p>}
            {weatherData && (
                <div className="weather-cards">
                    <div className="weather-card">
                        <h3>Temperature</h3>
                        <p>{weatherData.temperature}°C</p>
                    </div>
                    <div className="weather-card">
                        <h3>Humidity</h3>
                        <p>{weatherData.humidity} %</p>
                    </div>
                    <div className="weather-card">
                        <h3>Condition</h3>
                        <p>{weatherData.condition}</p>
                    </div>
                    <div className="weather-card">
                        <h3>Wind Speed</h3>
                        <p>{weatherData.windSpeed} m/s</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;