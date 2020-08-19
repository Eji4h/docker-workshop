import React, { useState, useEffect } from "react";
import axios from 'axios';
import configs from '../configs';
import _ from 'lodash';

type WorldTableProps = {
  cityIds: number[]
};

interface City {
  id: string,
  name: string;
  state_name: string;
  country_name: string;
  phonecode: string;
}

const renderTableHeader = (cities: City[]) => {
  const keys = _.keys(_.first(cities));
  return keys.map((key, index) => {
    const header = _.upperFirst(key)
      .replace('_', ' ');
    return <th key={index}>{header}</th>
  });
};

const renderTableData = (cities: City[]) => {
  return cities.map(city => {
    const { id, name, state_name, country_name, phonecode } = city;
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{state_name}</td>
        <td>{country_name}</td>
        <td>{phonecode}</td>
      </tr>
    );
  });
};

const WorldTable: React.FC<WorldTableProps> = ({ cityIds: ids }) => {

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const idStr = ids.reduce((a, c) => `${a},${c}`, '')
      .slice(1);
    const fetchData = async () => {
      const result = await axios.get<City[]>(`${configs.API_URL}/cities?ids=${idStr}`);
      setCities(result.data);
    };
    fetchData();
  }, [ids]);

  return (
    <div>
      <table id="world" className="worldTable ">
        <tbody>
          <tr>{renderTableHeader(cities)}</tr>
          {renderTableData(cities)}
        </tbody>
      </table>
    </div>
  );
};

export default WorldTable;
