import LightLabel from '../../app/components/labels/LightLabel';
import { Artist } from '../../models/artist';
import { emptyTextFixer } from '../../utils/general';
import ArtistSocialMedia from './ArtistSocialMedia';

type Props = {
  artist: Artist;
};

export default function ArtistBand({ artist }: Props) {
  return (
    <div className='col-span-2 flex-col flex'>
      <span className='font-semibold'>
        {artist?.name ?? 'Band information'}
      </span>
      <LightLabel
        title={
          'Total tracker numbers: ' + emptyTextFixer(artist?.tracker_count)
        }
      />
      <LightLabel
        title={
          'Upcoming number of event: ' +
          emptyTextFixer(artist?.upcoming_event_count)
        }
      />
      <LightLabel title={'Band number: ' + emptyTextFixer(artist?.id)} />

      <ArtistSocialMedia artist={artist} />
    </div>
  );
}
