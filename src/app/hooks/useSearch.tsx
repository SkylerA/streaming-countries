import React, { useState } from 'react'
import { GetIdResponse, type CountryResult } from '../types/MovieNightApi/GetId';

const useSearch = () => {
    const [results, setResults] = useState(undefined);


    const handleSearch = async (apiKey: string, id: string, ignoreCached: boolean = false) => {
        const storageKey = `result-${id}`;
        // To avoid API calls while testing we cache previous calls in localStorage
        let result = localStorage.getItem(storageKey);

        // Get API results if not cached or explicitly re-querying
        if (!result || ignoreCached) {
            // Add IMDb ID to endpoint
            const url = `https://streaming-availability.p.rapidapi.com/get?output_language=en&imdb_id=${id}`;
            // Add API Key
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                result = await response.text();
                // Cache result
                localStorage.setItem(storageKey, result);
            } catch (error) {
                console.error(error);
            }
        }

        // Parse and update results
        if (result) {
            const json = JSON.parse(result) as GetIdResponse;
            const found = parseApiResponse(json);

            setResults(found);
        }
    }

    const parseApiResponse = (data: GetIdResponse) => {
        const info = data.result.streamingInfo;
        const countries = [];
        // Step through each country
        for (const [country, val] of Object.entries(info)) {
            // Filter out countries that don't have a video for free or subscription
            const found = val.filter(obj => obj.streamingType === "subscription" || obj.streamingType === "free");
            // Add country code to results and store
            for (const obj of found) {
                countries.push({ country, ...obj } as CountryResult);
            }
        }

        return countries;
    }

    return { handleSearch, results };
}

export default useSearch