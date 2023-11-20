import { FaSearch } from 'react-icons/fa';

type Props = {
  placeHolder?: string;
  query?: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  placeHolder,
  query,
  onChangeValue,
}: Props) {
  const style = `py-2 outline-none p-2 w-full pr-3 pl-10 border-gray-200 border rounded-t-md text-sm`;
  return (
    <div className='lg:mr-28'>
      <div className='flex items-center relative pb-2 '>
        <FaSearch className=' ml-3 w-4 h-4 absolute' />
        <input
          placeholder={placeHolder}
          className={style}
          value={query}
          type='search'
          onChange={onChangeValue}
        />
      </div>
    </div>
  );
}
