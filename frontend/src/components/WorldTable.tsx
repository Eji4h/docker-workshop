import React, { useState } from "react";

export interface Country {
  name: string;
  state_name: string;
  country_name: string;
  phonecode: string;
}

const renderTableData = (countries: Country[]) => {
  const cs = countries.map((c, i) => {
    const { name, state_name, country_name, phonecode } = c; //destructuring
    return (
      <tr key={i}>
        <td>{name}</td>
        <td>{state_name}</td>
        <td>{country_name}</td>
        <td>{phonecode}</td>
      </tr>
    );
  });

  return cs;
};

const WorldTable: React.FC = () => {
  const countryData: Country[] = [
    {
      name: "name-mock",
      state_name: "state_name-mock",
      country_name: "country_name-mock",
      phonecode: "phonecode-mock",
    },
    {
      name: "name-mock2",
      state_name: "state_name-mock2",
      country_name: "country_name-mock2",
      phonecode: "phonecode-mock2",
    },
  ];

  const [countries, setCountries] = useState<Country[]>(countryData);

  const table = renderTableData(countries);

  return (
    <div>
      <table id="world">
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  );
};

export default WorldTable;
