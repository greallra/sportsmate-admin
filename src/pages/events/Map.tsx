import * as React from 'react';
import WorldMap from 'react-svg-worldmap';
// import './App.css';

export default function Map({ data }) {
  //   const data = [
  //     { country: 'cn', value: 1389618778 }, // china
  //     { country: 'in', value: 1311559204 }, // india
  //     { country: 'us', value: 331883986 }, // united states
  //     { country: 'id', value: 264935824 }, // indonesia
  //     { country: 'pk', value: 210797836 }, // pakistan
  //     { country: 'br', value: 210301591 }, // brazil
  //     { country: 'ng', value: 208679114 }, // nigeria
  //     { country: 'bd', value: 161062905 }, // bangladesh
  //     { country: 'ru', value: 141944641 }, // russia
  //     { country: 'mx', value: 127318112 }, // mexico
  //   ];

  return (
    <div className="App">
      <WorldMap
        color="red"
        title="VHI run countries covered"
        value-suffix="people"
        size="lg"
        data={data}
        tooltipTextFunction={(e) => {
          const findCountry = data.find((c) => c.country.toUpperCase() === e.countryCode);
          return findCountry.url;
        }}
      />
    </div>
  );
}
