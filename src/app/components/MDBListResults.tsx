import React from 'react'
import FreeListing from './FreeListing'
import { MovieResult } from '../types/MDBListApi/SearchByTitle';

type Props = {
    results: MovieResult[] | undefined;
    searchRef: React.RefObject<HTMLInputElement>;
    searchFn: (input: React.RefObject<HTMLInputElement>) => void;
}

const MDBListResults = (props: Props) => {
    const { results, searchRef, searchFn } = props;

    const search = (id: string) => {
        if (searchRef?.current && searchFn) {
            // update search field
            searchRef.current.value = id;
            // trigger search
            searchFn(searchRef);
        }
    }

    return (
        <>{
            results &&
            <div className='imdb-results card'>
                <h2>IMDb IDs</h2>
                {results && results.length < 1 && "No Movies Found"}
                {results.map((data, idx) => <div onClick={() => search(data.imdbid)} className='imdb-result' key={idx}>
                    <span><span className='title'>{`${data.title}(${data.year})`}</span><a className='imdb-link' href={`https://www.imdb.com/title/${data.imdbid}`} target='_blank'>IMDb</a></span>
                    <span className='id'>{data.imdbid}</span>
                </div>)}
            </div>
        }</>
    )
}

export default MDBListResults