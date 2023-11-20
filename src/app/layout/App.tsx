import { useCallback, useEffect, useState } from 'react';
import SearchInput from '../components/inputs/SearchInput';
import ArtistImage from '../../features/artists/ArtistImage';
import { Artist } from '../../models/artist';
import ArtistBand from '../../features/artists/ArtistBand';
import { ArtistEvent } from '../../models/artistEvent';
import {
  addEventToSessionStorage,
  getListFromSessionStorage,
  removeEventFromSessionStorage,
} from '../../features/artistEvents/sessionStorageEventHelper';
import ArtistEventList from '../../features/artistEvents/ArtistEventList';
import CentreLayer from './CentreLayer';
import ArtistEventFavorite from '../../features/artistEvents/ArtistEventFavorite';
import agent from '../../api/agent';
import { logInfo } from '../../utils/general';
import { useDebounce } from '../Hooks/useDebounce';

type EventArtistsObject = {
  [artistName: string]: ArtistEvent[];
};

type ArtistsObject = {
  [artistName: string]: Artist;
};

export default function App() {
  const [query, setQuery] = useState<string>('');
  const debounceQuery = useDebounce(query);
  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [events, setEvents] = useState<EventArtistsObject>({});
  const [results, setResults] = useState<ArtistsObject>({});
  const [currentEvent, setCurrentEvent] = useState<ArtistEvent>();
  const [currentEvents, setCurrentEvents] = useState<ArtistEvent[]>([]);
  const [storedFavorite, setStoredFavorite] = useState<ArtistEvent[]>([]);

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const list = getListFromSessionStorage(setStoredFavorite);
    setStoredFavorite(list);
  }, [setStoredFavorite]);

  const fetchEvent = useCallback(
    async (value: string, time = 'all') => {
      const fetchEvent = await agent.ArtistEvent.list(value);
      logInfo(fetchEvent);
      const newResults = { ...results, [value.toLowerCase()]: fetchEvent };
      setEvents(prev => {
        return { ...prev, ...newResults };
      });
      setCurrentEvents(fetchEvent);
    },
    [results, setEvents, setCurrentEvents]
  );

  const fetchData = useCallback(
    async (value: string) => {
      console.log(results);
      if (value?.length === 0) {
        return;
      }
      const filteredResult = results[value.toLowerCase()] ?? null;

      if (filteredResult) {
        console.log('found saved');
        console.log(filteredResult);
        setCurrentArtist(filteredResult);
        const event = events[value.toLowerCase()] ?? null;
        setCurrentEvents(event);
        return;
      }

      const fetchArtist = await agent.Artist.details(value);
      const count = fetchArtist?.id?.length;
      if (count > 0) {
        const newResults = { ...results, [value.toLowerCase()]: fetchArtist };
        setResults(prev => {
          return { ...prev, ...newResults };
        });
        setCurrentArtist(fetchArtist);
        fetchEvent(value);
      }
    },
    [results, events, fetchEvent]
  );

  useEffect(() => {
    fetchData(debounceQuery);
  }, [debounceQuery, fetchData]);

  return (
    <div className='grid md:grid-cols-3 grid-cols-1 m-12 gap-20'>
      {/* ***** Begin of left session*/}
      <div>
        <SearchInput
          placeHolder='search'
          query={query}
          onChangeValue={handlerChange}
        />
        <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-8 mb-6'>
          <div className=' col-span-1 border rounded-lg flex items-center'>
            <ArtistImage
              url={currentArtist?.image_url}
              name={currentArtist?.name}
            />
          </div>
          <ArtistBand artist={currentArtist} />
        </div>
        <ArtistEventList
          events={currentEvents}
          setCurrentEvent={setCurrentEvent}
          setStoredFavorite={setStoredFavorite}
          addEventToSessionStorage={addEventToSessionStorage}
          currentFavEvents={storedFavorite}
        />
      </div>
      {/* ***** End of left session*/}
      {/* ***** Begin of centre session*/}
      <div>
        <CentreLayer event={currentEvent} />
      </div>

      {/* ***** End of center session*/}
      <div>
        <ArtistEventFavorite
          storedFavorite={storedFavorite}
          removeEventFromSessionStorage={removeEventFromSessionStorage}
          setStoredFavorite={setStoredFavorite}
        />
      </div>
      {/* ***** End of left Session* */}
    </div>
  );
}
