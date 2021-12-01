import React, { useEffect, useState } from "react";
import axios from "axios";

interface ICountry {
  name: string;
  population: number;
  region: string;
  capital: string;
}

// create a variable to hold state until it is retrieved from the API
const defaultCountry: ICountry[] = [];

const Home: React.FC = () => {
  const [countries, setCountries]: [
    // tells typescript that I'm assigning a specific type to state
    ICountry[],
    (countries: ICountry[]) => void
  ] = useState(defaultCountry);

  useEffect(() => {
    // fetch countries
    axios
      .get<ICountry[]>("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <div data-testid="countries-list">
      {countries.map((country, i) => {
        return (
          <div data-testid="country" key={i}>
            {country.name}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
