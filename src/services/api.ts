/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";
import { HotelItem } from "../types/Hotel";

export interface FlightSearchParams {
    departure: string;
    destination: string;
    date: string;
  }
  
  export interface HotelSearchParams {
    query: any;
    destination: string;
    arrival_date: string;
    departure_date: string;
    guests: number;
  }
  
  export interface ActivitySearchParams {
    location: string;
    date: string;
    category?: string;
  }
  
  export interface Flight {
    airline: string;
    price: string;
    [key: string]: any; 
  }
  
  export interface Hotel {
    name?: string;
    price?: string;
    address?: string;
    [key: string]: any;
  }
  
  export interface Activity {
    name: string;
    price?: string;
    description: string;
    [key: string]: any;
  }
  

  

const API_BASE_URL = "https://booking-com15.p.rapidapi.com";
const API_KEY = 'd168ef116bmsh7d88cf017231ec9p16f480jsn8905ea1f8b3b';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
  },
});

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
    const response = await apiClient.get("/flights", { params });

    return response.data;
  };
  
  export const searchHotels = async ({ query }: { query: HotelSearchParams }): Promise<HotelItem[]> => {
    console.log("Sending query:", query);
    try {
      const response = await apiClient.get("/api/v1/hotels/searchDestination", { params: query });
      return response.data.data;
      
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      throw err;
    }
  };
  

  export const searchActivities = async (params: ActivitySearchParams): Promise<Activity[]> => {
    const response = await apiClient.get("/activities", { params });
    return response.data.results;
  };

  export const fetchHotelDetails = async (dest_id: string, search_type: string, queryParams: any) => {

    try {
      const response = await apiClient.get('/api/v1/hotels/searchHotels', {
        params: {
          dest_id,
          search_type,
          ...queryParams,
          languagecode: "en-us",
          currency_code: "AED",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch hotel details:", error);
      throw new Error("Error fetching hotel details.");
    }
  };

  export const getHotelDetails = async (hotelId: number, queryParams: HotelSearchParams) => {
  
    try {
      const response = await apiClient.get('api/v1/hotels/getHotelDetails', {
        params: {
          hotel_id: hotelId,
          ...queryParams,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      throw error;
    }
  };