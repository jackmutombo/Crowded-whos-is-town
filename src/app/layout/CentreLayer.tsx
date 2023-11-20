import ArtistEventMoreDetailsHOC from '../../features/artistEvents/ArtistEventMoreDetailsHOC';
import ArtistEventSelectedInfo from '../../features/artistEvents/ArtistEventSelectedInfo';
import ArtistEventSelectedOffer from '../../features/artistEvents/ArtistEventSelectedOffer';
import ArtistEventSelectedVenu from '../../features/artistEvents/ArtistEventSelectedVenu';
import { ArtistEvent } from '../../models/artistEvent';

type Props = {
  event?: ArtistEvent;
};

export default function CentreLayer({ event }: Props) {
  return (
    <>
      <span className=' font-bold text-lg'>Selected event information</span>
      {event && (
        <ArtistEventMoreDetailsHOC title='Event information'>
          <ArtistEventSelectedInfo event={event} />
        </ArtistEventMoreDetailsHOC>
      )}

      {event && (
        <ArtistEventMoreDetailsHOC title='Venue information'>
          <ArtistEventSelectedVenu event={event} />
        </ArtistEventMoreDetailsHOC>
      )}

      {event && (
        <ArtistEventMoreDetailsHOC title='Special offers'>
          <ArtistEventSelectedOffer event={event} />
        </ArtistEventMoreDetailsHOC>
      )}
    </>
  );
}
