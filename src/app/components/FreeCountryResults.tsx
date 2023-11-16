import React from 'react'
import { type CountryResult } from '../types/MovieNightApi/GetId'
import FreeListing from './FreeListing'

type Props = {
    results: CountryResult[]
}

const FreeCountryResults = (props: Props) => {
    const { results } = props;

    return (
        <>{
            results &&
            <div className='stream-results card'>
                <h2>Free-ish Streams</h2>
                {results && results.length < 1 && "No Free Options Found"}
                {results.map((data, idx) => <FreeListing data={data} key={idx} />)}
            </div>
        }</>
    )
}

export default FreeCountryResults