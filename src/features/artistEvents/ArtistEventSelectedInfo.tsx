import { ArtistEvent } from '../../models/artistEvent';
import { format } from 'date-fns';

type Props = {
  event: ArtistEvent;
};

export default function ArtistEventSelectedInfo({ event }: Props) {
  return (
    <>
      <div className='flex'>
        <span>URL:</span>
        <a
          href={event?.url}
          className='ml-4 text-blue-500 text-sm'
        >
          Go to the event
        </a>
      </div>

      <div className='flex mt-2'>
        <span>Description:</span>
        <span className='ml-4 text-sm'>{event?.description}</span>
      </div>

      <div className='flex mt-2'>
        <span> Date :</span>
        {event && (
          <span className='ml-4 text-sm'>
            {format(new Date(event.datetime), 'dd MMM yyyy, h:mm a')}
          </span>
        )}
      </div>
    </>
  );
}
