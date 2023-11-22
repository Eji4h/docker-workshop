import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import worldMapImage from './assets/Political_World_Map_(with_disputed_territories).png';
import WorldTable from './components/WorldTable';
import configs from './configs';

import './App.css';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cityCount, setCityCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get<{ count: number }>(`${configs.apiUrl}/cities/count`);
      setCityCount(result.data.count);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const numberOfShowRecord = 20;
  const randomCityIds = _.times(numberOfShowRecord, _.constant(0)).map((n) => _.random(0, cityCount));

  const worldTableRender = () =>
    isLoading ? <div>Loading...</div> : <WorldTable cityIds={randomCityIds}></WorldTable>;

  return (
    <div className="App">
      <h1 className="App-title">World Cities</h1>
      <img src={worldMapImage} alt="World Map" className="App-world-map" />
      <div className="App-source">
        Image source: &nbsp;
        <a
          href="https://commons.wikimedia.org/wiki/File:Political_World_Map_(with_disputed_territories).png"
          className="App-link"
        >
          File:Political World Map (with disputed territories).png
        </a>
      </div>
      {worldTableRender()}
      <div className="App-source">
        Database source: &nbsp;
        <a
          // eslint-disable-next-line max-len
          href="https://data.world/dr5hn/country-state-city?fbclid=IwAR2UaVsQq_iQdj6EA25muHzrwlaqqaoPqnunoxwsPYLOvrcc-RcD48nDMaI"
          className="App-link"
        >
          Country-State-City
        </a>
      </div>
    </div>
  );
};

export default App;
