import React, { useState, useEffect } from "react";
import getLocation from "./getLocation";
import ForecastStep from "./ForecastStep";

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const url = "rigsnvapi.azurewebsites.net/weather";
    const [timeSteps, setTimeSteps] = useState(null);
    
    useEffect(() => {
        
        async function fetchWeatherData() {
            try {
                const coordinates = await getLocation();
                try {
                    console.log("Coordinates: " + coordinates);
                    const response = await fetch(url, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: coordinates
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setWeatherData(data);
                    setTimeSteps(data.features[0].properties.timeSeries.length - 1);
                    
                } catch (error) {
                    setError(error);
                }
            }
            catch (error) {
                console.error("Error getting location: ", error);
                setError(error);
                return;
            }

        }
        fetchWeatherData();


    }, []);

    if (!weatherData) return <div>Loading...</div>;
    if (error) return <div>Unable to retrieve weather data: {error.message}</div>

    return (
        <div>
            <div className="forecast">
                <div className="forecast-data">
                    <div className="data-container">
                        <h3>Location:</h3>
                        <p>{weatherData.features[0].properties.location.name}</p>
                    </div>
                    <div className="data-container">
                        <h3>forecast Starts:</h3>
                        <p>{new Date(weatherData.features[0].properties.modelRunDate).toLocaleString()}</p>
                    </div>
                </div>
            </div>
            <div className="time-series">
                    {Array.from({ length: timeSteps }).map((_, timeStep) => (
                        <div key={timeStep} className="time-step">
                            <ForecastStep key={timeStep} weatherData={weatherData} timeStep={timeStep} />
                        </div>
                    ))}
            </div>
           
        </div>
    );
}

export default Weather;
