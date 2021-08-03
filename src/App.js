import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortData } from "./sortData";
import { Formatter } from "./Formatter";
const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        setCountry("WorldWide");
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countriesData = data.map((ele) => ({
            name: ele.country,
            value: ele.countryInfo.iso2,
          }));
          const finalData = sortData(data);
          setTableData(finalData);
          setCountries(countriesData);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.countryInfo.lat, data.countryInfo.long);
        setCountryInfo(data);
        setCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="add_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={(e) => onCountryChange(e)}
            >
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {countries.map((country, i) => {
                return (
                  <MenuItem value={country.value} key={i}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox
            onClick={() => setCasesType("cases")}
            active={casesType === "cases"}
            title="CoronaVirus cases"
            isRed
            total={Formatter(countryInfo.cases)}
            cases={Formatter(countryInfo.todayCases)}
          />
          <InfoBox
            onClick={() => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            total={Formatter(countryInfo.recovered)}
            cases={Formatter(countryInfo.todayRecovered)}
          />
          <InfoBox
            onClick={() => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths"
            isRed
            total={Formatter(countryInfo.deaths)}
            cases={Formatter(countryInfo.todayDeaths)}
          />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
