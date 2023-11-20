import { FaHeart } from 'react-icons/fa';

interface Props {
  title: string;
}

export default function EventItemCardForDisplay({ title }: Props) {
  return (
    <div className=' rounded-lg p-4 border mt-4 '>
      <div className=' grid grid-cols-3'>
        <div className=' col-span-2 flex ml-8'>
          <span>{title}</span>
        </div>
        <div className='col-span-1 flex justify-end'>
          <FaHeart color='blue' size='2rem' className=' text-xl' />
        </div>
      </div>
    </div>
  );
}
