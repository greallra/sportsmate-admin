import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Map from './Map';
import axios from 'axios';
import Mapbox from './Mapbox';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fbTimeObjectToDateObject } from '@/utils/utils';

interface FeatureGeometry {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

interface FeatureProperties {
  eventname: string;
  EventLongName: string;
  EventShortName: string;
  LocalisedEventLongName: string | null;
  countrycode: number;
  seriesid: number;
  EventLocation: string;
}

export interface GeoFeature {
  id: number;
  type: 'Feature';
  geometry: FeatureGeometry;
  properties: FeatureProperties;
}

function getCountryCodeFromURL(url) {
  // Remove protocol if present
  url = url.replace(/^https?:\/\//, '');

  // Split the domain into parts
  const domainParts = url.split('.');

  // Country code is usually the last part of the domain
  const countryCode = domainParts[domainParts.length - 1];

  return countryCode.toLowerCase();
}

export default function Events() {
  const queryClient = useQueryClient();

  // Fetch countries
  const { data: countries, isLoading: countriesLoading } = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/events/countries');
      return response.data;
    },
  });

  // Fetch events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/events');
      console.log('events', response.data);
      return response.data;
    },
  });
  const {
    data: eventsAppsEmbedded,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['eventsappsembedded'],
    queryFn: async () => {
      const { data } = await axios.get<Event[]>('http://localhost:3000/eventsappsembedded');
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events</div>;
  if (!countries) {
    return <div>Loading...</div>;
  }

  const formattedCountries = countries?.map((country) => ({
    ...country,
    country: country.url ? getCountryCodeFromURL(country.url) : 'x',
    value: 1,
  }));

  const eventsWithType: GeoFeature[] = events;
  console.log('eventsWithType', eventsWithType);

  return (
    <div className="container mx-auto py-10">
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="events">Events Dublin</TabsTrigger>
          <TabsTrigger value="events-map">Map View</TabsTrigger>
          <TabsTrigger value="countries">Countries covered</TabsTrigger>

          {/* <TabsTrigger value="events">Events All</TabsTrigger> */}
        </TabsList>

        <TabsContent value="events">
          <div className="p-2 bg-green-50 mb-2 rounded">There are {eventsAppsEmbedded?.length} events in Dublin</div>
          <Card className="p-3">
            <Accordion type="single" collapsible>
              {eventsAppsEmbedded?.map((event) => (
                <AccordionItem key={event.id} value={event.id}>
                  <AccordionTrigger className="flex-col justify-between">
                    <div className="text-lg font-bold"> {event?.properties?.EventLongName}</div>

                    <div>
                      Website:{' '}
                      <a
                        target="_blank"
                        href={`https://www.parkrun.ie/${event?.properties?.eventname}`}
                        className="underline text-blue-500"
                      >
                        {`https://www.parkrun.ie/${event?.properties?.eventname}`}
                      </a>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {event?.appEvents
                        .sort((a, b) => a.timestamp.seconds - b.timestamp.seconds)
                        .map((me) => {
                          const dateFormatted = format(fbTimeObjectToDateObject(me.timestamp), 'EEEE MMM dd');
                          const timeFormatted = format(fbTimeObjectToDateObject(me.timestamp), 'HH:mm');

                          return (
                            <Card key={me.id} className="p-3 bg-neutral-100">
                              <CardTitle>{event?.properties?.EventLongName} on</CardTitle>
                              <Badge className="mt-2 bg-blue-200">{me.type}</Badge>
                              <p className="text-sm text-gray-500 mt-2">
                                {dateFormatted} at {timeFormatted}
                              </p>
                            </Card>
                          );
                        })}
                      <p>{event.description}</p>
                      <p className="text-sm text-gray-500">Date: {new Date(event.date).toLocaleDateString()}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </TabsContent>
        <TabsContent value="events-map">
          <Card>
            <CardContent>
              <Card>{eventsWithType && eventsWithType.length > 0 && <Mapbox events={events} />}</Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>Countries Map</CardTitle>
              <CardDescription>View countries on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <Map data={formattedCountries} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="events">
          <Card>{events && events.length > 0 && <Mapbox events={events} />}</Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
