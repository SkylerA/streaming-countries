'use client';

import React, { type ChangeEvent, useState, useEffect, useCallback, useRef } from 'react'
import useCountrySearch from '../hooks/useSearch';
import FreeCountryResults from './FreeCountryResults';

type Props = {}

const Search = (props: Props) => {
  const [movieNightApiKey, setMovieNightApiKey] = useState('');
  const [imdbApiKey, setImdbApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { handleSearch, results, error } = useCountrySearch();

  const keySet = movieNightApiKey !== '';

  // Handle API Key rendering
  useEffect(() => {
    // Check for a stored api key
    const localKey = localStorage.getItem("_MovieNightApiKey") || '';
    if (localKey !== '') {
      // If we have a key already, update the field
      setMovieNightApiKey(localKey);
    } else {
      // Open the API Key detail if we don't have a key stored currently
      setShowApiKey(true);
    }
  }, []);

  // Set ApiKey and also store in LocalStorage
  const setAndStoreApiKey = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      localStorage.setItem('_MovieNightApiKey', val);
      setMovieNightApiKey(val);
    },
    [],
  )

  // Set ApiKey and also store in LocalStorage
  const setAndStoreImdbApiKey = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      localStorage.setItem('_ImdbApiKey', val);
      setImdbApiKey(val);
    },
    [],
  )

  function checkForEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleSearch(movieNightApiKey, searchRef.current?.value ?? "");
    }
  }

  return (
    <div className='search-container'>
      <details open={showApiKey} className='api-key flow-content'>
        <summary className={!keySet ? 'required' : ''}>API Keys</summary>
        <p>
          This uses the <a href="https://www.movieofthenight.com/about/api" target="_blank">Movie of the Night API</a> to look up movie availability. A free API key is required to request this info.
        </p>
        <p>
          <a className="button" href="https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/pricing" target="_blank">Request a Free Key here</a> and then paste it into the field bellow.
        </p>
        <p>
          <em>Your API key will only be stored locally to make the API request, nothing is sent to this server.</em>
        </p>
        <label>
          <span className='label'>
            API Key
          </span>
          <input value={movieNightApiKey} onChange={setAndStoreApiKey}></input>
        </label>
        <hr />
        <p>Optional</p>
        <label>
          <span className='label'>
            IMDb ID Lookup API Key
          </span>
          <input value={imdbApiKey} onChange={setAndStoreImdbApiKey}></input>
        </label>
      </details>
      <div>
        <label>
          <span className='label'>
            IMDb Movie ID
          </span>
          <a className="info" href="https://developer.imdb.com/documentation/key-concepts" target="_blank">?</a>
          <input className="search-field" type='text' onKeyDown={checkForEnter} ref={searchRef}></input>
          <button className='button' disabled={!keySet} onClick={() => handleSearch(movieNightApiKey, searchRef.current?.value ?? "")}>Search</button>
        </label>
      </div>
      {!error &&
        <FreeCountryResults results={results} />
      }
      {error &&
        <div>
          <p>
            Something went wrong while requesting data.
          </p>
          <p>
            Are your API Key({movieNightApiKey}) and IMDb ID({searchRef.current?.value}) valid?
          </p>
          <p className='error'>Error: {error}</p>
        </div>
      }
    </div>
  )
}

export default Search