import React from 'react';
import worldMapImage from './assets/Political_World_Map_(with_disputed_territories).png'
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
      <h1 className="App-title">
        World Cities
      </h1>
      <img src={worldMapImage} alt="World Map" className="App-world-map" />
      <div className="App-source">
        Image source: &nbsp;
        <a href="https://commons.wikimedia.org/wiki/File:Political_World_Map_(with_disputed_territories).png"
          className="App-link">
          File:Political World Map (with disputed territories).png
      </a>
      </div>
      <WorldTable cityIds={randomCityIds}></WorldTable>
      <div className="App-source">
        Database source: &nbsp;
          <a href="https://github.com/hiiamrohit/Countries-States-Cities-database" className="App-link">
          hiiamrohit/Countries-States-Cities-database
          </a>
      </div>
    </div>
  );
}

export default App;
