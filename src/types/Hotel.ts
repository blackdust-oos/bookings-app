export interface HotelItem {
    dest_id: string;
    search_type: string;
    region: string;
    dest_type: string;
    country: string;
    name: string;
    city_name: string;
    label: string;
    latitude: number;
    longitude: number;
    image_url: string;
    lc: string;
    roundtrip: string;
    cc1: string;
    city_ufi: string | null;
    hotels: number;
    nr_hotels: number;
  }

  export interface ProductPriceBreakdown {
    all_inclusive_amount?: {
      amount_rounded?: number;
    };
    included_taxes_and_charges_amount?: {
      amount_rounded?: number;
    };
  }
  
  export interface PropertyHighlight {
    name: string;
    icon_list?: { icon: string }[];
  }
  
  export interface Facility {
    name: string;
    icon?: string;
  }
  
  export interface FacilitiesBlock {
    name?: string;
    facilities?: Facility[];
  }
  
  export interface PropertyDetails {
    reviewScore?: number;
    reviewCount?: number;
    qualityClass?: string;
  }
  
  export interface HotelDetailsProps {
    data?: {
      hotel_name?: string;
      url?: string;
      address?: string;
      city?: string;
      district?: string;
      country_trans?: string;
      price_transparency_mode?: string;
      product_price_breakdown?: ProductPriceBreakdown;
      property_highlight_strip?: PropertyHighlight[];
      facilities_block?: FacilitiesBlock;
      arrival_date?: string;
      departure_date?: string;
      property?: PropertyDetails;
    };
  }
  