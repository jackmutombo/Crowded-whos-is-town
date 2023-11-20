import { ArtistEvent } from '../../models/artistEvent';

type Props = {
  event: ArtistEvent;
};
export default function ArtistEventSelectedOffer({ event }: Props) {
  return (
    <>
      {event?.offers.map(Offer => (
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
    </>
  );
}
