type Props = {
  title: string;
  children: any;
};
export default function ArtistEventMoreDetailsHOC({ title, children }: Props) {
  return (
    <div className='border p-4 mt-12 rounded-lg'>
      <div className='flex justify-center mb-10'>
        <span>{title}</span>
      </div>
      <div className='grid grid-cols-1 ml-8'>{children}</div>
    </div>
  );
}
