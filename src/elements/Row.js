import React, {useState, useEffect} from 'react';
import axios from '../axios';
import './Row.css';
import {Link} from 'react-router-dom';

function Row({title, fetchUrl, isLargeRow = false}) {
    const baseImgUrl = 'https://image.tmdb.org/t/p/original/';
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    //Trailers
    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            let trailerurl = await axios.get(
                `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        }
    };

    console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <Link to={`/info/${movie.id}`} className='row-poster__link'>
                                <img
                                    key={movie.id}
                                    onClick={() => handleClick(movie)}
                                    className="row__poster row__posterLarge"
                                    src={`${baseImgUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                />
                            </Link>
                        )
                )}
            </div>

            {/*{trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}*/}
        </div>
    );

    // from video
    // const handleClick = (movie) => {
    //     if (trailerUrl) {
    //         setTrailerUrl("");
    //     } else {
    //         movieTrailer(movie?.name || "")
    //             .then((url) => {
    //                 const urlParams = new URLSearchParams(new URL(url).search);
    //                 setTrailerUrl(urlParams.get('v'));
    //             })
    //             .catch((error) => console.log(error));
    //     }
    // }
}

export default Row;
