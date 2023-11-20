export interface Artist {
    thumb_url: string
    mbid: string
    facebook_page_url: string
    image_url: string
    tracker_count: number
    tracking: any[]
    upcoming_event_count: number
    url: string
    support_url: string
    show_multi_ticket: boolean
    name: string
    options: Options
    links?: Link[]
    artist_optin_show_phone_number: boolean
    id: string
  }
  
  export interface Options {
    display_listen_unit: boolean
  }
  
  export interface Link {
    type: string
    url: string
  }
  
  export interface ArtistParams {    
    app_id: string;
  }