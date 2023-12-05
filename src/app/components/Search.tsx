'use client';

import React, { useState, useRef } from 'react'
import useSearch, { SearchRequest } from '../hooks/useSearch';
import FreeCountryResults from './FreeCountryResults';
import ApiKeys from './ApiKeys';
import { CountryResult, GetIdResponse, parseGetIdResponse } from '../types/MovieNightApi/GetId';
import { MovieResult, SearchByTitleResponse, parseSearchByTitleResponse } from '../types/MDBListApi/SearchByTitle';

type Props = {}

const movieNightRequestDefaults: SearchRequest<GetIdResponse, CountryResult[]> = {
  apiKey: '',
  apiHost: 'streaming-availability.p.rapidapi.com',
  requestUrl: 'https://streaming-availability.p.rapidapi.com/get',
  paramStr: '',
  parseFn: parseGetIdResponse,
  ignoreCached: true
}

const imdbRequestDefaults: SearchRequest<SearchByTitleResponse, MovieResult[]> = {
  apiKey: '',
  apiHost: 'mdblist.p.rapidapi.com',
  requestUrl: 'https://mdblist.p.rapidapi.com/',
  paramStr: '',
  parseFn: parseSearchByTitleResponse,
  ignoreCached: true
}

const Search = (props: Props) => {
  const [movieNightApiKey, setMovieNightApiKey] = useState('');
  const [imdbApiKey, setImdbApiKey] = useState('');
  const countrySearchRef = useRef<HTMLInputElement>(null);
  const imdbSearchRef = useRef<HTMLInputElement>(null);
  const { handleSearch: handleCountrySearch, results: countryResults, error: countryError } = useSearch<GetIdResponse, CountryResult[]>();
  const { handleSearch: handleImdbSearch, results: imdbResults, error: imdbError } = useSearch<SearchByTitleResponse, MovieResult[]>();

  const keySet = movieNightApiKey !== '';

  function checkForEnter(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      movieNightSearch(countrySearchRef);
    }
  }

  function movieNightSearch(input: React.RefObject<HTMLInputElement>) {
    const val = input?.current?.value ?? "";
    const paramStr = `?output_language=en&imdb_id=${val}`
    const req = { ...movieNightRequestDefaults, apiKey: movieNightApiKey, paramStr };
    handleCountrySearch(req);
  }

  function imdbSearch(input: React.RefObject<HTMLInputElement>) {
    const val = input?.current?.value ?? "";
    const paramStr = `?s=${val}`
    const req = { ...imdbRequestDefaults, apiKey: imdbApiKey, paramStr };
    handleImdbSearch(req);
  }

  return (
    <div className='search-container'>
      <ApiKeys imdbApiKey={imdbApiKey} setImdbApiKey={setImdbApiKey} movieNightApiKey={movieNightApiKey} setMovieNightApiKey={setMovieNightApiKey} />
      {imdbApiKey !== '' &&
        <div>
          <label>
            <span className='label'>
              Movie Title
            </span>
            <input className="search-field" type='text' onKeyDown={checkForEnter} ref={imdbSearchRef}></input>
            <button className='button' disabled={!keySet} onClick={() => imdbSearch(imdbSearchRef)}>Search</button>
          </label>
        </div>
      }
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
      {!countryError &&
        <FreeCountryResults results={countryResults} />
      }
      {countryError &&
        <div>
          <p>
            Something went wrong while requesting data.
          </p>
          <p>
            Are your API Key({movieNightApiKey}) and IMDb ID({countrySearchRef.current?.value}) valid?
          </p>
          <p className='error'>Error: {countryError}</p>
        </div>
      }
    </div>
  )
}

export default Search