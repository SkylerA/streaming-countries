'use client';

import React, { useState, useRef } from 'react'
import useSearch, { SearchRequest } from '../hooks/useSearch';
import FreeCountryResults from './FreeCountryResults';
import ApiKeys from './ApiKeys';
import { CountryResult, GetIdResponse, parseGetIdResponse } from '../types/MovieNightApi/GetId';

type Props = {}

const movieNightRequestDefaults: SearchRequest<GetIdResponse, CountryResult[]> = {
  apiKey: '',
  apiHost: 'streaming-availability.p.rapidapi.com',
  requestUrl: 'https://streaming-availability.p.rapidapi.com/get?output_language=en',
  paramStr: '',
  parseFn: parseGetIdResponse,
  ignoreCached: true
}

const Search = (props: Props) => {
  const [movieNightApiKey, setMovieNightApiKey] = useState('');
  const [imdbApiKey, setImdbApiKey] = useState('');
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const { handleSearch, results, error } = useSearch<GetIdResponse, CountryResult[]>();

  const keySet = movieNightApiKey !== '';

  function checkForEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      movieNightSearch(countrySearchRef);
    }
  }

  function movieNightSearch(input: React.RefObject<HTMLInputElement>) {
    const val = input?.current?.value ?? "";
    const paramStr = `&imdb_id=${val}`
    const req = { ...movieNightRequestDefaults, apiKey: movieNightApiKey, paramStr };
    handleSearch(req);
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
          <input className="search-field" type='text' onKeyDown={checkForEnter} ref={countrySearchRef}></input>
          <button className='button' disabled={!keySet} onClick={() => movieNightSearch(countrySearchRef)}>Search</button>
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
            Are your API Key({movieNightApiKey}) and IMDb ID({countrySearchRef.current?.value}) valid?
          </p>
          <p className='error'>Error: {error}</p>
        </div>
      }
    </div>
  )
}

export default Search