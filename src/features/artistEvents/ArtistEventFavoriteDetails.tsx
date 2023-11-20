import { FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ArtistEvent } from '../../models/artistEvent';

type Props = {
  title: string;
  eventId: string;
  onClickDelFav: (eventId: string, currentFavoriteEvents: ArtistEvent[], setToDisplayFavoriteEvent:(event: ArtistEvent[])=> void) => void;
  storedFavorite: ArtistEvent[];
  setStoredFavorite: (event: ArtistEvent[])=> void;

};
export default function ArtistEventFavoriteDetails({ title, eventId, onClickDelFav, storedFavorite, setStoredFavorite}: Props) {
  return (
    <div className=' rounded-lg p-4 border mt-4 '>
      <div className=' grid grid-cols-3'>
        <div className=' col-span-2 flex'>
          <FaStar
            className=' text-xl'
            size='2rem'
          />
          <span className='ml-8'>{title}</span>
        </div>
        <div className='col-span-1 flex justify-end'>
          <MdDelete
            className=' text-xl'
            size='2rem'
            color='red'
            onClick={() => onClickDelFav(eventId, storedFavorite, setStoredFavorite)}
          />
        </div>
      </div>
    </div>
  );
}
