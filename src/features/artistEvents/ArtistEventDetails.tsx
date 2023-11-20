import { FaHeart } from 'react-icons/fa';
import { ArtistEvent } from '../../models/artistEvent';

type Props = {
  onClickArtistEvent: (eevent: ArtistEvent) => void;
  onClickAddToFavorite: (event: ArtistEvent) => void;
  artistEvent: ArtistEvent;
  title: string;
};

export default function ArtistEventDetails({
  onClickArtistEvent,
  onClickAddToFavorite,
  artistEvent,
  title,
}: Props) {
  return (
    <div
      className='rounded-lg p-4 border mt-4'
      onClick={() => {
        onClickArtistEvent(artistEvent);
      }}
    >
      <div className=' grid grid-cols-3'>
        <div className='col-span-2 flex ml-8'>
          <span>{title}</span>
        </div>
        <div className='col-span-1 flex justify-end'>
          <FaHeart
            className=' text-xl'
            color='green'
            size='2rem'
            onClick={() => {
              onClickAddToFavorite(artistEvent);
            }}
          />
        </div>
      </div>
    </div>
  );
}
