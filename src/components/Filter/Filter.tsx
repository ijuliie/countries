import React from "react";
import "./Filter.css";

interface IProps {
  handleSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Filter: React.FC<IProps> = ({ handleSelectChange }) => {
  const regions = ["africa", "americas", "asia", "europe", "oceania"];

  return (
    <div>
      <select data-testid="select" id="region" onChange={handleSelectChange}>
        <option data-testid="hidden" className="hidden" value="">
          Filter by Region
        </option>
        {regions.map((region) => (
          <option data-testid={region} key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;