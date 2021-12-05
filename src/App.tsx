import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import CountriesList from "./components/CountriesList/CountriesList";
import CountryDetails from './components/CountryDetails/CountryDetails'
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<CountriesList />} />
        <Route path=':name' element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
