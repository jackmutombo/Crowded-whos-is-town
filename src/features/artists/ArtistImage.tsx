type Props = {
  url?: string;
  name?: string;
};
export default function ArtistImage({ url, name }: Props) {
  return (
    <img
      src={url ?? '/images/logo.png'}
      alt={name}
    />
  );
}
