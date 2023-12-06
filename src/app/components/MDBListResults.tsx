import React from 'react'
import FreeListing from './FreeListing'
import { MovieResult } from '../types/MDBListApi/SearchByTitle';

type Props = {
    results: MovieResult[] | undefined;
}

const MDBListResults = (props: Props) => {
    const { results } = props;

    return (
        <>{
            results &&
            <div className='imdb-results card'>
                <h2>IMDb IDs</h2>
                {results && results.length < 1 && "No Movies Found"}
                {results.map((data, idx) => <div className='imdb-result' key={idx}>
                    <span>{`${data.title}(${data.year})`}<a className='imdb-link' href={`https://www.imdb.com/title/${data.imdbid}`} target='_blank'>IMDb</a></span>
                    <span>{data.imdbid}</span>
                </div>)}
            </div>
        }</>
    )
}

export default MDBListResults