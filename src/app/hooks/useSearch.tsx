import React, { useState } from 'react'

export type SearchRequest<API_RESPONSE, PARSE_RESULT> = {
    apiKey: string,
    apiHost: string,
    requestUrl: string,
    paramStr: string,
    parseFn: (data: API_RESPONSE) => PARSE_RESULT,
    ignoreCached: boolean
}

const useSearch = <API_RESPONSE, PARSE_RESULT>() => {
    const [results, setResults] = useState<PARSE_RESULT | undefined>(undefined);
    const [error, setError] = useState("");

    const handleSearch = async (request: SearchRequest<API_RESPONSE, PARSE_RESULT>) => {
        const { apiKey, apiHost, requestUrl, paramStr, parseFn, ignoreCached } = request;
        const storageKey = `result-${paramStr}`;
        // To avoid API calls while testing we cache previous calls in localStorage
        // let result = localStorage.getItem(storageKey);
        let result = ''; // disabling caching in release for now

        // Get API results if not cached or explicitly re-querying
        if (!result || ignoreCached) {
            // Add IMDb ID to endpoint
            const url = `${requestUrl}${paramStr}`;
            // Add API Key
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': apiKey,
                    'X-RapidAPI-Host': apiHost
                }
            };

            try {
                const response = await fetch(url, options);
                if (response.ok) {
                    result = await response.text();
                    // Cache result
                    // localStorage.setItem(storageKey, result);
                    // disabling caching in release for now
                } else {
                    const json = await response.json();
                    throw json.message;
                }
            } catch (error) {
                if (typeof error === "string") {
                    setError(error);
                } else {
                    console.log(error);
                    setError("Unhandled Error: check console log");
                }
            }
        }

        // Parse and update results
        if (result) {
            const json = JSON.parse(result) as API_RESPONSE;
            const found = parseFn(json);

            setError("");
            setResults(found);
        }
    }

    return { handleSearch, results, error };
}

export default useSearch