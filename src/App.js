import React, { Fragment, useEffect, useState } from "react";
import TodaysCard from "./Components/TodaysCard";
import City from "./Components/City";
import ProgressBar from "./Components/ProgressBar";
import { API_KEY } from "./config";

import "./App.css";

const App = () => {

    const [coords, setCoords] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const [location, setLocation] = useState("");
    const [searchError, setSearchError] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((c) => {
            setCoords({ longitude: c.coords.longitude, latitude: c.coords.latitude });
        }, () => alert("Permission denied. Can't show weather information."));
    }, []);

    useEffect(() => {
        if (coords.latitude && coords.longitude) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&APPID=${API_KEY}`)
                .then(weather => weather.json())
                .then(data => {
                    setWeatherData(data);
                    setSearchError("");
                });
        }
    }, [coords]);

    const getWeatherData = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${API_KEY}`)
            .then(weather => weather.json())
            .then(data => {
                if (data && data.cod === 200) {
                    setWeatherData(data);
                    setSearchError("");
                }
                else {
                    setSearchError(data.message);
                }
            })
            .catch(error => {
                console.error(`Error is search :: ${error}`)
            });
    }

    return (
        <Fragment>
            <ProgressBar />
            <City current={weatherData} />
            <TodaysCard
                main={weatherData.main}
                city={weatherData.name}
            />
            <div className="weather-wrapper">
                <div className="location-search-wrapper">
                    <form onSubmit={(e) => { e.preventDefault(); getWeatherData();}}>
                    <input
                        type="text"
                        value={location}
                        placeholder="Enter a location to find weather information"
                        onChange={e => setLocation(e.target.value)}
                        required />
                    {!!searchError && <p className="error-text">{searchError}</p>}
                    <button>Get</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default App;