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
      {/* <header className="App-header">
        <img src={worldMapImage} alt="World Map" />
      </header> */}
      <WorldTable cityIds={randomCityIds}></WorldTable>
    </div>
  );
}

export default App;
