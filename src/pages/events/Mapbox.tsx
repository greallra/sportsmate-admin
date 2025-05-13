import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

const featureData = [
  {
    id: 1,
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-0.335791, 51.410992],
    },
    properties: {
      eventname: 'bushy',
      EventLongName: 'Bushy parkrun',
      EventShortName: 'Bushy Park',
      LocalisedEventLongName: null,
      countrycode: 97,
      seriesid: 1,
      EventLocation: 'Bushy Park, Teddington',
    },
  },
];

type FeatureProperties = {
  [key: string]: string | number | null;
};

type Feature = {
  id: number;
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: FeatureProperties;
};

type MapWithGeoJsonMarkersProps = {
  events: Feature[];
  center: [number, number];
};

const MapWithGeoJsonMarkers = ({ events, center }: MapWithGeoJsonMarkersProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: center || [-6.2603, 53.3498],
      zoom: 10,
    });

    events.forEach((feature) => {
      const [lng, lat] = feature.geometry.coordinates;
      // Dynamically build HTML for all properties
      const propertiesHtml = Object.entries(feature.properties)
        .map(([key, value]) => `<strong>${key}:</strong> ${value ?? ''}`)
        .join('<br>');

      const el = document.createElement('div');
      el.style.width = '25px';
      el.style.height = '25px';
      el.style.backgroundImage = 'url(https://docs.mapbox.com/help/demos/custom-markers-gl-js/mapbox-icon.png)';
      el.style.backgroundSize = 'cover';
      el.style.cursor = 'pointer';

      const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(propertiesHtml);

      // Show popup on click
      marker.getElement().addEventListener('click', () => {
        marker.setPopup(popup);
        popup.setLngLat([lng, lat]).addTo(map);
      });
    });

    return () => map.remove();
  }, [events, center]);

  return <div ref={mapContainer} style={{ height: '100vh' }} />;
};

export default MapWithGeoJsonMarkers;
