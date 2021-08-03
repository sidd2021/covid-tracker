import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import "./Map.css";
import { Formatter } from "./Formatter";
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    mulitiplier: 800,
  },

  recovered: {
    hex: "#7DD71D",
    mulitiplier: 1200,
  },

  deaths: {
    hex: "#C0C0C0",
    mulitiplier: 2000,
  },
};
const ShowDataOnMap = (data, casesType = "cases") => {
  console.log(casesTypeColors[casesType].hex);
  return data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].mulitiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases:{Formatter(numeral(country.cases).format("0.0"))}
          </div>
          <div className="info-recovered">
            Recovered:{Formatter(numeral(country.recovered).format("0.0"))}
          </div>
          <div className="info-deaths">
            Deaths:{Formatter(numeral(country.deaths).format("0.0"))}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};
export default ShowDataOnMap;
