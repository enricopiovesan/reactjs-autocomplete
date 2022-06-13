import { useEffect, useState } from 'react';
import axios from 'axios';

import useDebaunce from './useDebaunce';
import { City, GetResponse } from '../types/city';

const URL: string = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const HEADERS = {
  'X-RapidAPI-Key': 'O15wyMQBvYmsh8PLGlEocdraPDl0p1NZ9IhjsnYj276zYcwI7b',
  'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
};
const API_CALL_LIMIT: number = 1000;

const useSearchCities = (query: string): GetResponse => {
  const initlResponse: GetResponse = {
    isLoading: false,
    cities: [],
    error: { isError: false }
  };
  const [response, setResponse] = useState<GetResponse>(initlResponse);
  const debauceedCity = useDebaunce(query, API_CALL_LIMIT);

  const mapDataToCities = (data: any): Array<City> => {
    if (!data.data || !Array.isArray(data.data)) return [];
    return data.data.map(
      (city: City): City => ({
        id: city.id,
        name: city.name,
        country: city.country
      })
    );
  };

  useEffect(() => {
    if (debauceedCity) {
      const options = {
        params: { namePrefix: query, namePrefixDefaultLangResults: 'true' },
        headers: HEADERS
      };
      axios
        .get(URL, options)
        .then((resp) => {
          const response: GetResponse = {
            cities: mapDataToCities(resp.data),
            isLoading: false,
            error: { isError: false }
          };
          setResponse(response);
        })
        .catch((err) => {
          const response: GetResponse = {
            isLoading: false,
            cities: [],
            error: { isError: true, error: err }
          };
          setResponse(response);
        });
    }
  }, [debauceedCity]);

  return response;
};

export default useSearchCities;
