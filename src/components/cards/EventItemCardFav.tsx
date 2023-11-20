import { FaStar } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export interface Props {
  title: string;
  onClick: (eventId: string) => void;
  eventId: string;
}

export default function EventItemCardFav({title, onClick, eventId}: Props) {
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
            onClick={() => onClick(eventId)}
          />
        </div>
      </div>
    </div>
  );
}
