import { FaHeart } from 'react-icons/fa';
import { EventArtist } from '../../Models/EventArtist';

export interface IEventItemCardProps {
  title: string;
  onClick: (e: EventArtist) => void;
  theEvent: EventArtist;
  addFavorite: (ev: EventArtist) => void;
}

export default function EventItemCard(props: IEventItemCardProps) {
  return (
    <div
      className='rounded-lg p-4 border mt-4'
      onClick={() => props.onClick(props.theEvent)}
    >
      <div className=' grid grid-cols-3'>
        <div className='col-span-2 flex ml-8'>
          <span>{props.title}</span>
        </div>
        <div className='col-span-1 flex justify-end'>
          <FaHeart
            className=' text-xl'
            color='green'
            size='2rem'
            onClick={() => props.addFavorite(props.theEvent)}
          />
        </div>
      </div>
    </div>
  );
}
