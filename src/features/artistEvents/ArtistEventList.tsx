import { ArtistEvent } from '../../models/artistEvent';
import ArtistEventDetails from './ArtistEventDetails';

type Props = {
  events: ArtistEvent[];
  setCurrentEvent: (ev: ArtistEvent) => void;
  setStoredFavorite: (ev: ArtistEvent[]) => void;
  addEventToSessionStorage: (
    ev: ArtistEvent,
    currentFavEvents: ArtistEvent[],
    setCurrentFavEvents: (eve:ArtistEvent[]) => void
  ) => void;
};
export const displayTitleEvent = (ev: ArtistEvent) => {
  if (ev.title.trim().length === 0) return ev.venue.name;
  return ev.title;
};

export default function ArtistEventList({
  events,
  setCurrentEvent,
  setStoredFavorite,
  addEventToSessionStorage,
}: Props) {
  const onSelectEvent = (event: ArtistEvent) => {
    setCurrentEvent(event);
  };

  return (
    <div className=' grid grid-cols-1'>
      {events?.length > 0 &&
        events.map(e => (
          <ArtistEventDetails
            key={e.id}
            title={displayTitleEvent(e)}
            onClickArtistEvent={onSelectEvent}
            onClickAddToFavorite={() =>
              addEventToSessionStorage(e, events, setStoredFavorite)
            }
            artistEvent={e}
          />
        ))}
    </div>
  );
}
