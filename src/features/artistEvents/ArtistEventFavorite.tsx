import { ArtistEvent } from '../../models/artistEvent';
import ArtistEventFavoriteDetails from './ArtistEventFavoriteDetails';
import { displayTitleEvent } from './ArtistEventList';

type Props = {
  storedFavorite: ArtistEvent[];
  removeEventFromSessionStorage: (eventId: string, currentFavoriteEvents: ArtistEvent[], setToDisplayFavoriteEvent:(event: ArtistEvent[])=> void) => void
  setStoredFavorite: (event: ArtistEvent[])=> void;
};

export default function ArtistEventFavorite({
  storedFavorite,
  removeEventFromSessionStorage,
  setStoredFavorite
}: Props) {
  return (
    <>
      <span className='font-bold text-lg'>Favorites</span>
      <div className='grid grid-cols-1 mt-8'>
        {storedFavorite.map(event => (
          <ArtistEventFavoriteDetails
            key={event.id}
            title={displayTitleEvent(event)}
            onClickDelFav={removeEventFromSessionStorage}
            eventId={event.id}
            storedFavorite={storedFavorite}
            setStoredFavorite={setStoredFavorite}
          />
        ))}
      </div>
    </>
  );
}
