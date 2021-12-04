import React, { useEffect, useState } from "react";
import { useMatch } from "react-router";
import axios from "axios";
import "./CountryDetails.css";
var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

interface IDetails {
  data: {
    flags: { png: string };
    name: Name;
    population: number;
    region: string;
    subregion: string;
    capital: string;
    tld: Array<string>;
    currencies: {
      [key: string]: string;
    };
    languages: object;
    borders: Array<string>;
  }[];
}

interface Name {
  common: string;
  nativeName: {
    [key: string]: {
      official: string;
    };
  };
}

const CountryDetails: React.FC = () => {
  const [details, setDetails] = useState<IDetails["data"]>([]);
  const match = useMatch(":name");

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${match?.params.name}`)
      .then((response) => {
        setDetails(response.data);
      });
  }, []);

  // loop through object with different keys
  const getNativeName = (data: any) => {
    for (let key in data.nativeName) {
      return data.nativeName[key].official;
    }
  };

  const getCurrency = (data: any) => {
    for (let key in data) {
      return data[key].name;
    }
  };

  return (
    <div>
      {details.map((data) => {
        return (
          <div
            key={data.name.common}
            data-testid="details"
            className="details-wrapper"
          >
            <div className="details-img-wrapper">
              <img className="img" src={data.flags.png} />
            </div>
            <div>
              <div>
                <div>{data.name.common}</div>
                <div>Native Name: {getNativeName(data.name)}</div>
                <div>Population: {data.population}</div>
                <div>Region: {data.region}</div>
                <div>Sub Region: {data.subregion}</div>
                <div>Capital: {data.capital}</div>
                <div>Top Level Domain: {data.tld[0]}</div>
                <div>Currencies: {getCurrency(data.currencies)}</div>
                <div>
                  Languages:{" "}
                  {Object.entries(data.languages).map(
                    // 3rd argument in map function refers back to the original array that is being looped through
                    ([_, val], index, arr) => {
                      {
                        // if index is not equal length of array minus 1, add a comma
                      }
                      if (index != arr.length - 1) {
                        return `${val}, `;
                      } else {
                        return val;
                      }
                    }
                  )}
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
