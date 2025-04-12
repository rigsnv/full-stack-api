import React from "react";

const ForecastStep = ({weatherData, timeStep}) => {

    return (
        <div className="forecast-step">
            <p>Time: {new Date(weatherData.features[0].properties.timeSeries[timeStep].time).toLocaleString()}</p>
            <p>Temperature: {weatherData.features[0].properties.timeSeries[timeStep].screenTemperature} °C</p>
            <p>Max Temperature: {weatherData.features[0].properties.timeSeries[timeStep].maxScreenAirTemp} °C</p>
            <p>Min Temperature: {weatherData.features[0].properties.timeSeries[timeStep].minScreenAirTemp} °C</p>
            <p>Dew Point: {weatherData.features[0].properties.timeSeries[timeStep].screenDewPointTemperature} °C</p>
            <p>Feels Like: {weatherData.features[0].properties.timeSeries[timeStep].feelsLikeTemperature} °C</p>
            <p>Wind Speed: {weatherData.features[0].properties.timeSeries[timeStep].windSpeed10m} m/s</p>
            <p>Wind Direction: {weatherData.features[0].properties.timeSeries[timeStep].windDirectionFrom10m} °</p>
            <p>Wind Gust Speed: {weatherData.features[0].properties.timeSeries[timeStep].windGustSpeed10m} m/s</p>
            <p>Max Wind Gust: {weatherData.features[0].properties.timeSeries[timeStep].max10mWindGust} m/s</p>
            <p>Visibility: {weatherData.features[0].properties.timeSeries[timeStep].visibility} m</p>
            <p>Humidity: {weatherData.features[0].properties.timeSeries[timeStep].screenRelativeHumidity} %</p>
            <p>Pressure: {weatherData.features[0].properties.timeSeries[timeStep].mslp} hPa</p>
            <p>UV Index: {weatherData.features[0].properties.timeSeries[timeStep].uvIndex}</p>
            <p>Weather Code: {weatherData.features[0].properties.timeSeries[timeStep].significantWeatherCode}</p>
            <p>Precipitation Rate: {weatherData.features[0].properties.timeSeries[timeStep].precipitationRate} mm/h</p>
            <p>Total Precipitation Amount: {weatherData.features[0].properties.timeSeries[timeStep].totalPrecipAmount} mm</p>
            <p>Total Snow Amount: {weatherData.features[0].properties.timeSeries[timeStep].totalSnowAmount} mm</p>
            <p>Probability of Precipitation: {weatherData.features[0].properties.timeSeries[timeStep].probOfPrecipitation} %</p>
        </div>
    );
}

export default ForecastStep;