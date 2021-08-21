import React from 'react';
import Toggle from './Toggle';

const City = (props) => {
  const { current } = props;
  return (
    <div>
      <Toggle />
      <h1 className="text-center">
        <span className="today-city">{current.name}</span>
      </h1>
    </div>
  );
};

export default City;
