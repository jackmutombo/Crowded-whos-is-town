import EventItemCard from '../components/cards/EventItemCard';
import EventItemCardFav from '../components/cards/EventItemCardFav';
import InfoCardContainer from '../components/cards/InfoCardContainer';
import SearchInput from '../components/inputs/SearchInput';
import LightLabel from '../components/labels/LightLabel';
import {
  FaAmazon,
  FaExternalLinkAlt,
  FaFacebookSquare,
  FaInstagramSquare,
  FaItunes,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { useCallback, useEffect, useState } from 'react';
import { Artist } from '../Models/artist';
import { EventArtist } from '../Models/EventArtist';
import { format } from 'date-fns';
import agent from '../api/agent';
import { logInfo } from '../utils/general';

export interface IHomeProps {}

type ArtistsObject = {
  [artistName: string]: Artist;
};

type EventArtistsObject = {
  [artistName: string]: EventArtist[];
};

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

enum SocialMedia {
  FACEBOOK = 'facebook',
  AMAZON = 'Amazon',
  TWITTER = 'twitter',
  WEBSITE = 'website',
  ITUNES = 'itunes',
  SPOTIFY = 'spotify',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  INSTAGRAM = 'instagram',
}

const sessionKey = 'favoriteArrayKey';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const debounceQuery = useDebounce(query);
  const [results, setResults] = useState<ArtistsObject>({});
  const [events, setEvents] = useState<EventArtistsObject>({});
  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [currentEvent, setCurrentEvent] = useState<EventArtist>();
  const [currentEvents, setCurrentEvents] = useState<EventArtist[]>([]);
  const [storedArray, setStoredArray] = useState<EventArtist[]>([]);

  const addEventToSessionStorage = (event: EventArtist) => {
    // Check if the item already exists in the stored array
    const itemExists = storedArray.some(item => item.id === event.id);

    if (itemExists) return;

    const updatedArray = [...storedArray, event];
    updateSessionStorage(updatedArray);
  };
  const removeEventFromSessionStorage = (eventId: string) => {
    const updatedArray = [...storedArray];
    const indexToRemove = updatedArray.findIndex(item => item.id === eventId);

    if (indexToRemove !== -1) {
      updatedArray.splice(indexToRemove, 1);
      updateSessionStorage(updatedArray);
    }
  };
  const updateSessionStorage = (updatedArray: EventArtist[]) => {
    const updatedArrayAsString = JSON.stringify(updatedArray);
    sessionStorage.setItem(sessionKey, updatedArrayAsString);
    setStoredArray(updatedArray);
  };

  const getListFromSessionStorage = (): EventArtist[] => {
    const arrayAsString = sessionStorage.getItem(sessionKey);
    if (arrayAsString === null) return [];
    const arrayFromStorage = JSON.parse(arrayAsString) || [];
    setStoredArray(arrayFromStorage);
    return arrayFromStorage;
  };

  useEffect(() => {
    const list = getListFromSessionStorage();
    setStoredArray(list);
  }, []);
  const fetchEvent = useCallback(
    async (value: string, time = 'all') => {
        const fetchEvent = await agent.EventArtist.list(value);
        logInfo({fetchEvent});
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

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  function emptyTextFixer(text: any) {
    if (text === undefined) return '-';
    return text;
  }

  function hasLinkUrl(socialName: string) {
    try {
      if (currentArtist === null || currentArtist === undefined) return false;
      const link = currentArtist?.links?.find(x => x.type === socialName);
      if (link) return true;
      return false;
    } catch (error) {
      return false;
    }
  }
  function findLinkUrl(socialName: string) {
    const link = currentArtist?.links?.find(x => x.type === socialName);
    if (link) return link.url;
  }

  const displayTitleEvent = (ev: EventArtist) => {
    if (ev.title.trim().length === 0) return ev.venue.name;
    return ev.title;
  };
  const onSelectEvent = (event: EventArtist) => {
    setCurrentEvent(event);
  };

  return (
    <div className=' grid md:grid-cols-3 grid-cols-1 m-12  gap-20'>
      <div>
        <div className='lg:mr-28'>
          <SearchInput
            placeHolder='search'
            query={query}
            onChangeValue={handlerChange}
          />
        </div>

        <div className='grid lg:grid-cols-3 grid-cols-1 gap-8 mt-8 mb-6'>
          <div className=' col-span-1 border rounded-lg flex items-center'>
            <img
              src={currentArtist?.image_url ?? '/images/logo.png'}
              alt={currentArtist?.name}
            />
          </div>

          <div className=' col-span-2 flex-col flex '>
            <span className='font-semibold'>
              {currentArtist?.name ?? 'Band information'}
            </span>

            <LightLabel
              title={
                'Total tracker numbers: ' +
                emptyTextFixer(currentArtist?.tracker_count)
              }
            />

            <LightLabel
              title={
                'Upcoming number of event: ' +
                emptyTextFixer(currentArtist?.upcoming_event_count)
              }
            />
            <LightLabel
              title={'Band number: ' + emptyTextFixer(currentArtist?.id)}
            />

            <div className='flex mt-4'>
              {hasLinkUrl(SocialMedia.FACEBOOK) && (
                <a href={findLinkUrl(SocialMedia.FACEBOOK)}>
                  <FaFacebookSquare className=' text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.INSTAGRAM) && (
                <a href={findLinkUrl(SocialMedia.INSTAGRAM)}>
                  <FaInstagramSquare className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.TWITTER) && (
                <a href={findLinkUrl(SocialMedia.TWITTER)}>
                  <FaTwitter className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.AMAZON) && (
                <a href={findLinkUrl(SocialMedia.AMAZON)}>
                  <FaAmazon className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.YOUTUBE) && (
                <a href={findLinkUrl(SocialMedia.YOUTUBE)}>
                  <FaYoutubeSquare className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.TIKTOK) && (
                <a href={findLinkUrl(SocialMedia.TIKTOK)}>
                  <FaTiktok className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.SPOTIFY) && (
                <a href={findLinkUrl(SocialMedia.SPOTIFY)}>
                  <FaSpotify className='ml-2 text-xl' />
                </a>
              )}
              {hasLinkUrl(SocialMedia.ITUNES) && (
                <a href={findLinkUrl(SocialMedia.ITUNES)}>
                  <FaItunes className='ml-2 text-xl' />
                </a>
              )}
              <br />
              {hasLinkUrl(SocialMedia.WEBSITE) && (
                <a href={findLinkUrl(SocialMedia.WEBSITE)}>
                  <FaExternalLinkAlt className='ml-2 text-xl' />
                </a>
              )}
            </div>
          </div>
        </div>
        <div className=' grid grid-cols-1'>
          {currentEvents?.length > 0 &&
            currentEvents.map(x => (
              <EventItemCard
                key={x.id}
                title={displayTitleEvent(x)}
                onClick={onSelectEvent}
                addFavorite={t => addEventToSessionStorage(x)}
                theEvent={x}
              />
            ))}
        </div>
      </div>
      <div>
        <span className=' font-bold text-lg'>Selected event information</span>
        {currentEvent && (
          <InfoCardContainer title='Event information'>
            <div className='flex'>
              <span>URL:</span>
              <a
                href={currentEvent?.url}
                className='ml-4 text-blue-500 text-sm'
              >
                Go to the event
              </a>
            </div>

            <div className='flex mt-2'>
              <span>Description:</span>
              <span className='ml-4 text-sm'>{currentEvent?.description}</span>
            </div>

            <div className='flex mt-2'>
              <span> Date :</span>
              {currentEvent && (
                <span className='ml-4 text-sm'>
                  {format(
                    new Date(currentEvent.datetime),
                    'dd MMM yyyy, h:mm a'
                  )}
                </span>
              )}
            </div>
          </InfoCardContainer>
        )}
        {currentEvent && (
          <InfoCardContainer title='Venue information'>
            <div className='flex mt-2'>
              <span> Name:</span>
              <span className='ml-4 text-sm'>{currentEvent?.venue.name}</span>
            </div>
            <div className='flex mt-2'>
              <span> City:</span>
              <span className='ml-4 text-sm'>{currentEvent?.venue.city}</span>
            </div>
            <div className='flex mt-2'>
              <span> Region :</span>
              <span className='ml-4 text-sm'>{currentEvent?.venue.region}</span>
            </div>
            <div className='flex mt-2'>
              <span> Country :</span>
              <span className='ml-4 text-sm'>
                {currentEvent?.venue.country}
              </span>
            </div>
          </InfoCardContainer>
        )}
        {currentEvent && (
          <InfoCardContainer title='Special offers'>
            {currentEvent?.offers.map(Offer => (
              <div className='flex'>
                <span>{Offer?.type}</span>
                <a
                  href={Offer?.url}
                  className='ml-4 text-blue-500 text-sm'
                >
                  {'Go to the page'}
                </a>
                <span>Status :</span>
                <span className='ml-4 text-sm'>{Offer?.status}</span>
              </div>
            ))}
          </InfoCardContainer>
        )}
      </div>
      <div>
        <span className=' font-bold text-lg'>Favorites</span>

        <div className=' grid grid-cols-1 mt-8'>
          {storedArray.map(event => (
            <EventItemCardFav
              key={event.id}
              title={displayTitleEvent(event)}
              onClick={removeEventFromSessionStorage}
              eventId={event.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
