import {
  FaAmazon,
  FaExternalLinkAlt,
  FaFacebookSquare,
  FaInstagramSquare,
  FaItunes,
  FaSpotify,
  FaTiktok,
  FaTwitter,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { SocialMedia } from '../../models/socialMedia';
import { Artist } from '../../models/artist';

type Props = {
  artist?: Artist;
};

export default function ArtistSocialMedia({ artist }: Props) {
  function hasLinkUrl(socialName: string) {
    try {
      if (artist === null || artist === undefined) return false;
      const link = artist?.links?.find(x => x.type === socialName);
      if (link) return true;
      return false;
    } catch (error) {
      return false;
    }
  }
  function findLinkUrl(socialName: string) {
    const link = artist?.links?.find(x => x.type === socialName);
    if (link) return link.url;
  }
  return (
    <div className='flex mt-4'>
      {hasLinkUrl(SocialMedia.FACEBOOK) && (
        <a href={findLinkUrl(SocialMedia.FACEBOOK)}>
          <FaFacebookSquare className=' text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.INSTAGRAM) && (
        <a href={findLinkUrl(SocialMedia.INSTAGRAM)}>
          <FaInstagramSquare className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.TWITTER) && (
        <a href={findLinkUrl(SocialMedia.TWITTER)}>
          <FaTwitter className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.AMAZON) && (
        <a href={findLinkUrl(SocialMedia.AMAZON)}>
          <FaAmazon className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.YOUTUBE) && (
        <a href={findLinkUrl(SocialMedia.YOUTUBE)}>
          <FaYoutubeSquare className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.TIKTOK) && (
        <a href={findLinkUrl(SocialMedia.TIKTOK)}>
          <FaTiktok className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.SPOTIFY) && (
        <a href={findLinkUrl(SocialMedia.SPOTIFY)}>
          <FaSpotify className='ml-2 text-xl' />
        </a>
      )}
      {hasLinkUrl(SocialMedia.ITUNES) && (
        <a href={findLinkUrl(SocialMedia.ITUNES)}>
          <FaItunes className='ml-2 text-xl' />
        </a>
      )}
      <br />
      {hasLinkUrl(SocialMedia.WEBSITE) && (
        <a href={findLinkUrl(SocialMedia.WEBSITE)}>
          <FaExternalLinkAlt className='ml-2 text-xl' />
        </a>
      )}
    </div>
  );
}
