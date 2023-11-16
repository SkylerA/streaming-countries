'use client';

import React, { type ChangeEvent, useState, useEffect, useCallback, useRef } from 'react'
import useSearch from '../hooks/useSearch';
import FreeCountryResults from './FreeCountryResults';

type Props = {}

const Search = (props: Props) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { handleSearch, results } = useSearch();

  const keySet = apiKey !== '';

  // Handle API Key rendering
  useEffect(() => {
    // Check for a stored api key
    const localKey = localStorage.getItem("_ApiKey") || '';
    if (localKey !== '') {
      // If we have a key already, update the field
      setApiKey(localKey);
    } else {
      // Open the API Key detail if we don't have a key stored currently
      setShowApiKey(true);
    }
  }, []);

  // Set ApiKey and also store in LocalStorage
  const setAndStoreApiKey = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      localStorage.setItem('_ApiKey', val);
      setApiKey(val);
    },
    [],
  )

  return (
    <div className='search-container'>
      <details open={showApiKey} className='api-key flow-content'>
        <summary className={!keySet ? 'required' : ''}>API Key</summary>
        <p>This uses the <a href="https://www.movieofthenight.com/about/api" target="_blank">Movie of the Night API</a> to look up movie availability. A free API key is required to request this info. <a className="button" href="https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/pricing" target="_blank">Request a Free Key here</a> and then paste it into the field bellow. <em>Your API key will only be used/stored locally, nothing is sent to this server.</em></p>
        <label>
          API Key
          <input value={apiKey} onChange={setAndStoreApiKey}></input>
        </label>
      </details>
      <div>
        <label>
          IMDb Movie ID
          <a className="info" href="https://developer.imdb.com/documentation/key-concepts" target="_blank">?</a>
          <input type='text' ref={searchRef}></input>
        </label>
        <button className='button' disabled={!keySet} onClick={() => handleSearch(apiKey, searchRef.current?.value ?? "")}>Search</button>
      </div>
      <FreeCountryResults results={results} />
    </div>
  )
}

export default Search