import React, { useEffect, useState } from "react";
import { useMatch } from "react-router";
import axios from "axios";
import "./CountryDetails.css";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface IDetails {
  data: {
    flag: string;
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subRegion: string;
    capital: string;
    topLevelDomain: Array<string>;
    currencies: {
      [key: string]: Currencies;
    };
    languages: { name: string }[];
    borders: Array<string>;
  }[];
}

interface Currencies {
  name: string;
}

const CountryDetails: React.FC = () => {
  const [details, setDetails] = useState<IDetails["data"]>([]);
  const match = useMatch(":name");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v2/name/${match?.params.name}`)
      .then((response) => {
        setDetails(response.data);
      });
  }, []);

  const checkIndex = (index: number, arr: Array<object>) => {
    if (index != arr.length) {
      return ", ";
    } else {
      return "";
    }
  };

  return (
    <div>
      {details.map((data) => {
        return (
          <div className="details-wrapper">
            <div className="details-img-wrapper">
              <img className="img" src={data.flag} />
            </div>
            <div>
              <div>
                <div>{data.name}</div>
                <div>Native Name: {data.nativeName}</div>
                <div>Population: {data.population}</div>
                <div>Region: {data.region}</div>
                <div>Sub Region: {data.subRegion}</div>
                <div>Capital: {data.capital}</div>
                <div>Top Level Domain: {data.topLevelDomain[0]}</div>
                <div>Currencies: {data.currencies[0].name}</div>
                <div>
                  Languages:{" "}
                  {/* 3rd argument in map function refers back to the original array that is being looped through */}
                  {data.languages.map((language, index, arr) => (
                    <span key={index}>
                      {language.name}
                      {/* if index is not equal length of array minus 1, add a comma */}
                      {checkIndex(index, arr)}
                    </span>
                  ))}
                </div>
                <div>
                  Border Countries:{" "}
                  {data.borders
                    ? data.borders.map((country) => (
                        <span key={country}>
                          {countries.getName(country, "en")} 
                        </span> 
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CountryDetails;
