import { ArtistEvent } from '../../models/artistEvent';

type Props = {
  event: ArtistEvent;
};

export default function ArtistEventSelectedVenu({ event }: Props) {
  return (
    <>
      <div className='flex mt-2'>
        <span> Name:</span>
        <span className='ml-4 text-sm'>{event?.venue?.name}</span>
      </div>
      <div className='flex mt-2'>
        <span> City:</span>
        <span className='ml-4 text-sm'>{event?.venue?.city}</span>
      </div>
      <div className='flex mt-2'>
        <span> Region :</span>
        <span className='ml-4 text-sm'>{event?.venue?.region}</span>
      </div>
      <div className='flex mt-2'>
        <span> Country :</span>
        <span className='ml-4 text-sm'>{event?.venue?.country}</span>
      </div>
    </>
  );
}
