'use client';

import React, { type ChangeEvent, useState, useEffect, useCallback, useRef } from 'react'

type Props = {}

const Search = (props: Props) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

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
    <div>
      <details open={showApiKey} className='flow-content'>
        <summary className={!keySet ? 'required' : ''}>API Key</summary>
        <p>This uses <a href="">Move of the Night</a> to look up movie availability. A free API key is required to request this info. <a className="button" href="https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/pricing">Request a Free Key here</a> and then paste it into the field bellow. <em>Your API key will only be used/stored locally, nothing is sent to this server.</em></p>
        <label>
          API Key
          <input value={apiKey} onChange={setAndStoreApiKey}></input>
        </label>
      </details>
      <label>
        IMDb Movie ID
        <a className="info" href="https://developer.imdb.com/documentation/key-concepts">?</a>
        <input type='text' ref={searchRef}></input>
      </label>
      <button className='button' disabled={!keySet}>Search</button>
    </div>
  )
}

export default Search