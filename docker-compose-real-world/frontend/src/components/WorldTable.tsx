import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

import configs from '../configs';

import './WorldTable.css';

type WorldTableProps = {
  cityIds: number[];
};

interface City {
  id: string;
  name: string;
  stateName: string;
  countryName: string;
  phoneCode: string;
}

const renderTableHeader = (cities: City[]) => {
  const keys = _.keys(_.first(cities));
  return keys.map((key, index) => {
    const header = _.upperFirst(key);
    return <th key={key}>{header}</th>;
  });
};

const renderTableData = (cities: City[]) => {
  return cities.map((city) => {
    const { id, name, stateName, countryName, phoneCode } = city;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{stateName}</td>
        <td>{countryName}</td>
        <td>{phoneCode}</td>
      </tr>
    );
  });
};

const WorldTable: React.FC<WorldTableProps> = ({ cityIds: ids }) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const idStr = ids.reduce((a, c) => `${a},${c}`, '').slice(1);
    const fetchData = async () => {
      const result = await axios.get<City[]>(`${configs.apiUrl}/cities?ids=${idStr}`);
      setCities(result.data);
    };
    fetchData();
  }, [ids]);

  return (
    <div>
      <table id="world" className="WorldTable-table">
        <tbody>
          <tr>{renderTableHeader(cities)}</tr>
          {renderTableData(cities)}
        </tbody>
      </table>
    </div>
  );
};

export default WorldTable;
