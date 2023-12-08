import React, { useEffect, useState } from 'react'
import ApiKeyPrompt from './ApiKeyPrompt'

type Props = {
    imdbApiKey: string,
    setImdbApiKey: React.Dispatch<React.SetStateAction<string>>,
    movieNightApiKey: string,
    setMovieNightApiKey: React.Dispatch<React.SetStateAction<string>>,
}


// Movie of the Night API Prompt vars
const MovieNightStorageKey = "_MovieNightApiKey";
const MovieNightUrl = "https://rapidapi.com/movie-of-the-night-movie-of-the-night-default/api/streaming-availability/pricing";
const MovieNightDesc = <>This uses the <a href="https://www.movieofthenight.com/about/api" target="_blank">Movie of the Night API</a> to look up movie availability. A free API key is required to request this info.</>;

// IMDb ID Search API Prompt vars
const IMDbDesc = <>If you want to enable IMDb ID lookups (so you can search by movie name instead of copy/pasting from urls) you can grab another free key for an API that allows ID lookups</>;
const IMDbStorageKey = "_IMDbApiKey";
const IMDbUrl = "https://rapidapi.com/linaspurinis/api/mdblist/pricing";

const ApiKeys = (props: Props) => {
    const { imdbApiKey, setImdbApiKey, movieNightApiKey, setMovieNightApiKey } = props;
    const [showApiKey, setShowApiKey] = useState(false);

    const keySet = movieNightApiKey !== '';

    // Load api keys on first render
    useEffect(() => {
        // Check for a stored api keys
        let localKey = localStorage.getItem(MovieNightStorageKey) || '';
        if (localKey !== '') {
            // If we have a key already, update the field
            setMovieNightApiKey(localKey);
        } else {
            // Open the API Key detail if we don't have a key stored currently
            setShowApiKey(true);
        }
        // IMDb ID api key is optional so don't need to setShowApiKey if it's missing
        localKey = localStorage.getItem(IMDbStorageKey) || '';
        setImdbApiKey(localKey);
    }, []);


    return (
        <details open={showApiKey} className='api-key flow-content'>
            <summary className={!keySet ? 'required' : ''}>API Keys</summary>
            <p>
                <em>Your API keys will only be stored locally to make the API requests, nothing is sent to this server.</em>
            </p>
            <ApiKeyPrompt apiKey={movieNightApiKey} setApiKey={setMovieNightApiKey} storageKey={MovieNightStorageKey} apiRegistryUrl={MovieNightUrl} description={MovieNightDesc} />
            <hr />
            <p><em>Optional IMDb ID Lookup API Key</em></p>
            <ApiKeyPrompt apiKey={imdbApiKey} setApiKey={setImdbApiKey} storageKey={IMDbStorageKey} apiRegistryUrl={IMDbUrl} description={IMDbDesc} />
        </details>
    )
}

export default ApiKeys