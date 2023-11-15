import React from 'react'
import { type CountryResult } from '../types/MovieNightApi/GetId'
import FreeListing from './FreeListing'

type Props = {
    results: CountryResult[]
}

const FreeCountryResults = (props: Props) => {
    const { results } = props;

    return (
        <div className='stream-results card'>
            <h2>Free-ish Streams</h2>
            {results.map((data, idx) => <FreeListing data={data} key={idx} />)}
        </div>
    )
}

export default FreeCountryResults