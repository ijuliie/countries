import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import "./CountriesList.css";
import { Link } from "react-router-dom";

export interface ICountry {
  flag: string;
  name: string;
  population: number;
  region: string;
  subRegion: string;
  capital: string;
  topLevelDomain: Array<string>;
  currencies: string;
  languages: Array<string>;
  borderCountries: Array<string>;
}
[];

// create a variable to hold state until it is retrieved from the API
const defaultCountry: ICountry[] = [];

const CountriesList: React.FC = () => {
  const [countries, setCountries]: [
    // tells typescript that I'm assigning a specific type to state
    ICountry[],
    (countries: ICountry[]) => void
  ] = useState(defaultCountry);
  const [country, setCountry] = useState<ICountry["name"]>("");

  useEffect(() => {
    // fetch countries
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/name/${country}`)
      .then((response) => {
        setCountries(response.data);
      });
    setCountry(country);
    setCountry("");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setCountry(value);
  };

  return (
    <div className="home-container">
      <Input
        country={country}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <div className="countries-list" data-testid="countries-list">
        {countries.map((country, i) => {
          return (
            <div className="card" data-testid="country" key={i}>
              <Link to={`${country.name}`}>
                <div className="img-container">
                  <img className="img" src={country.flag} />
                </div>
                <p>{country.name}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;
