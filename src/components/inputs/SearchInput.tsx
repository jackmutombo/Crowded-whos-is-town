import * as React from 'react';
import { FaSearch } from 'react-icons/fa';

export interface ISearchInputProps {
  placeHolder?: string;
  query?: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput(props: ISearchInputProps) {
  const style = `py-2   outline-none  p-2   w-full pr-3 pl-10 border-gray-200 border rounded-t-md text-sm`;
  return (
    <div className='flex items-center relative pb-2 '>
      <FaSearch className=' ml-3  w-4 h-4 absolute' />
      <input
        placeholder={props.placeHolder}
        className={style}
        value={props.query}
        type='search'
        onChange={props.onChangeValue}
      />
    </div>
  );
}
