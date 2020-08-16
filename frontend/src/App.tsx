import React from 'react';
import logo from './logo.svg';
import './App.css';
import WorldTable from './components/WorldTable';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <WorldTable></WorldTable>
    </div>
  );
}

export default App;
