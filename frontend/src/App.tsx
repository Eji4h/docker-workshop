import React from 'react';
import worldMapImage from './assets/world-physical-map-mercator-large.jpg'
import './App.css';
import WorldTable from './components/WorldTable';
import _ from 'lodash';
import configs from './configs';

const App: React.FC = () => {

  const numberOfShowRecord = 20;
  const randomCityIds = _.times(numberOfShowRecord, _.constant(0))
    .map(n => _.random(0, configs.MAX_CITY_ID));

  return (
    <div className="App">
      <h1>
        World Cities
      </h1>
      <img src={worldMapImage} alt="World Map" className="world-map"/>
      <WorldTable cityIds={randomCityIds}></WorldTable>
      <footer className="App-footer">
        <div>
          <a href="https://google.com" className="App-link">
            Reference
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
