import { Artist } from './artist';

export interface EventArtist {
  id: string;
  url: string;
  datetime: string;
  title: string;
  description: string;
  artist?: Artist;
  venue: Venue;
  lineup: string[];
  offers: Offer[];
  artist_id: string;
  on_sale_datetime: string;
  festival_start_date: string;
  festival_end_date: string;
  festival_datetime_display_rule: string;
  starts_at: string;
  ends_at: string;
  datetime_display_rule: string;
  bandsintown_plus: boolean;
  isSelected: boolean;
  isFavorite: boolean;
}

export interface Venue {
  location: string;
  name: string;
  latitude?: string;
  longitude?: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  region: string;
  type?: string;
  timezone?: string;
}

export interface Offer {
  type: string;
  url: string;
  status: string;
}
