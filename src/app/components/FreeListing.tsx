import React from 'react'
import { type CountryResult } from '../types/MovieNightApi/GetId'
import countryLookup from '../types/MovieNightApi/countries.json'

type Props = {
    data: CountryResult
}

const Countries: { [key: string]: string } = countryLookup;
const Services: { [key: string]: string } = { "prime": "amazon prime" };

const FreeListing = (props: Props) => {
    const { data } = props;

    const service = (Services[data.service] ?? data.service);

    return (
        <div className='listing'>
            <span className='country'>{Countries[data.country]}</span>&nbsp;
            <span className='service'>{service}</span>&nbsp;
            <span data-quality={data.quality}>{data.quality}</span>&nbsp;
            <span className='stream-type'>{data.streamingType}</span>
        </div>
    )
}

export default FreeListing