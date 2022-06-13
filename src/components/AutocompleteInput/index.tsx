import React, { useState, ReactElement, useEffect } from 'react';
import './index.css';

import useSearchCities from '../../hooks/useSearchCities';
import { City } from '../../types/city';

const AutocompleteInput = (): ReactElement => {
  const [results, setResults] = useState<ReactElement>();
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const response = useSearchCities(searchQuery);

  const handleOnChange = (value: string) => {
    setSearchQuery(value);
    setShowResults(false);
  };

  const handleOnClick = () => {};

  const cittiesToMenu = (cities: Array<City>): ReactElement => {
    if (cities.length == 0) return <div />;
    const list = cities.map((city: City) => (
      <div key={city.id}>
        {city.name} <span>{city.country}</span>
      </div>
    ));
    return <div className={'menu'}>{list}</div>;
  };

  useEffect(() => {
    setResults(cittiesToMenu(response.cities));
    if (response.cities.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [response]);

  return (
    <div className={'searchBox'}>
      <p>Search for cities: {response.isLoading && 'loading...'}</p>
      <input
        onClick={handleOnClick}
        onChange={(e) => handleOnChange(e.target.value)}
      />
      {showResults && results}
    </div>
  );
};

export default AutocompleteInput;
