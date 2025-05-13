import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
// import { Autocomplete } from '@mantine/core';
import { AutoComplete } from '@/components/Forms/custom-components/AutoComplete';
import { useEffect } from 'react';

const PlacesAuto = ({ setSelected }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'YOUR_CALLBACK_NAME',
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  async function handleSelect(address) {
    console.log(address);
    setValue(address);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log('results', results);
    const { geometry, address_components, formatted_address } = results[0];
    setSelected({
      geometry: {
        lat,
        lng,
        // viewport: geometry.viewport
      },
      address_components,
      formatted_address,
    });
  }

  return (
    <div>
      da
      {/* <Autocomplete 
              disabled={!ready}
              data={status === 'OK' && data.map((item) =>({...item, value: item.description}))} 
              value={value} 
              onChange={(value) => setValue(value)} 
              onOptionSubmit={handleSelect}
              label='Location'
              placeholder='Type a location'
            /> */}
      <AutoComplete
        selectedValue={value}
        onSelectedValueChange={(value) => setValue(value)}
        searchValue={value}
        onSearchValueChange={(value) => setValue(value)}
        items={status === 'OK' && data.map((item) => ({ ...item, value: item.description }))}
        isLoading={false}
        emptyMessage="emptyMessage"
        placeholder="ph"
      />
    </div>
  );
};
export default PlacesAuto;
