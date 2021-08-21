import React from "react";

const TodaysCard = (props) => {
  const { main, city } = props;
  const mainTemp = main ? Math.round(main.temp) : '';
  return (
    <>
      <div className="weather-wrapper">
        <div className="weather-card">
          <h1>{mainTemp}°C</h1>
          <p>{city}</p>
        </div>
      </div>
    </>
  );
};

export default TodaysCard;