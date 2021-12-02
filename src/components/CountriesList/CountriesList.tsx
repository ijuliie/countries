import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import axios from "axios";
import "./CountriesList.css";

export interface ICountry {
  flag: string
  name: string;
  population: number;
  region: string;
  capital: string;
}

// create a variable to hold state until it is retrieved from the API
const defaultCountry: ICountry[] = [];

const CountriesList: React.FC = () => {
  const [countries, setCountries]: [
    // tells typescript that I'm assigning a specific type to state
    ICountry[],
    (countries: ICountry[]) => void
  ] = useState(defaultCountry);
  // const [region, setRegion] = useState<ICountry["region"]>("");

  const [country, setCountry] = useState<ICountry["name"]>("");

  useEffect(() => {
    // fetch countries
    axios
      .get<ICountry[]>(`https://restcountries.com/v2/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);
  


  return (
    <div className="home-container">
      <Input country={country} setCountries={setCountries} setCountry={setCountry} />
      <div className="countries-list" data-testid="countries-list">
        {countries.map((country, i) => {
          console.log(country)
          return (
            <div className='card' data-testid="country" key={i}>
              <div className='img-container'>
                <img className='img' src={country.flag} />
              </div>
              <p>{country.name}</p>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountriesList;