'use client';

import React, { useState, useRef } from 'react'
import useCountrySearch from '../hooks/useSearch';
import FreeCountryResults from './FreeCountryResults';
import ApiKeys from './ApiKeys';

type Props = {}

const Search = (props: Props) => {
  const [movieNightApiKey, setMovieNightApiKey] = useState('');
  const [imdbApiKey, setImdbApiKey] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { handleSearch, results, error } = useCountrySearch();

  const keySet = movieNightApiKey !== '';

  function checkForEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleSearch(movieNightApiKey, searchRef.current?.value ?? "");
    }
  }

  return (
    <div className='search-container'>
      <ApiKeys imdbApiKey={imdbApiKey} setImdbApiKey={setImdbApiKey} movieNightApiKey={movieNightApiKey} setMovieNightApiKey={setMovieNightApiKey} />
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