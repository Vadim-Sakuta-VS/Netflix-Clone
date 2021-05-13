import React, {useState, useEffect} from 'react';
import axios from '../axios';
import requests from '../Requests';
import Nav from '../elements/Nav'
import {useParams} from 'react-router-dom';
import './InfoScreen.css'
import Youtube from 'react-youtube';

const InfoContentTableRow = ({title, content}) => {
    return (
        <div className="info-content__table-row">
            <div className="info-content__table-row-title">{title}</div>
            <div className="info-content__table-row-content">{content || '---'}</div>
        </div>
    )
}

function InfoScreen() {
    const [movie, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    const {id} = useParams();

    // useEffect(() => {
    //     async function fetchData() {
    //         const request = await axios.get(requests.fetchNetflixOriginals);
    //         setMovie(
    //             request.data.results[
    //             Math.floor(Math.random() * request.data.results.length - 1)
    //             ]
    //         );
    //         return request;
    //     }
    //     fetchData();
    // }, []);

    useEffect(() => {
        (async function fetchData() {
            const request = await axios.get(requests.fetchMovieDetails(id));
            console.log(request);
            setMovie(request.data);

            let trailerurl = await axios.get(
                `/movie/${request.data.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
            );
            setTrailerUrl(trailerurl.data.results[0]?.key);
        })();
    }, [id]);

    const opts = {
        height: '150',
        width: '100%',
        // playerVars: {
        //     autoplay: 1,
        // },
    };

    console.log(movie);
    const countries = movie?.production_countries?.map(c => c.name).join(', ');
    const companies = movie?.production_companies?.map(c => c.name).join(', ');
    const genres = movie?.genres?.map(g => g.name).join(', ');

    return (

        <div>
            <div className="infoScreen" style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            }}>
            </div>
            <Nav/>
            {/*<div className="infoScreen_gradient"/>*/}

            <div className="info-content">
                <div className="info-content__col">
                    <div className="info-content__poster">
                        <img src={`https://image.tmdb.org/t/p/w200${movie?.poster_path}`} alt="poster"/>
                    </div>
                    <div>
                        <Youtube videoId={trailerUrl} opts={opts}/>
                    </div>
                </div>
                <div className="info-content__col">
                    <h2 className="info-content__title">{movie?.title}</h2>
                    <p className="info-content__overview">
                        {movie?.overview}
                    </p>
                    <div className="info-content__table">
                        <h4 className="info-content__table-title">About movie</h4>
                        <InfoContentTableRow title="Original title" content={movie?.original_title}/>
                        <InfoContentTableRow title="Original language" content={movie?.original_language}/>
                        <InfoContentTableRow title="Relaese date" content={movie?.release_date}/>
                        <InfoContentTableRow title="Country" content={countries}/>
                        <InfoContentTableRow title="Companies" content={companies}/>
                        <InfoContentTableRow title="Genres" content={genres}/>
                        <InfoContentTableRow title="Budget" content={movie?.budget ? `${movie?.budget}$` : '---'}/>
                        <InfoContentTableRow title="Revenue" content={movie?.revenue?`${movie?.revenue}$`:'---'}/>
                        <InfoContentTableRow title="Runtime" content={`${movie?.runtime}min`}/>
                        <InfoContentTableRow title="Status" content={movie?.status}/>
                        <InfoContentTableRow title="Tagline" content={movie?.tagline}/>
                    </div>
                </div>
                <div className="info-content__col">
                    <div className="info-content__vote">
                        <p className="vote_average">{movie?.vote_average}</p>
                        <p className="vote_count">{movie?.vote_count}</p>
                    </div>
                </div>
                {/*<div className="info-content__col"></div>*/}
                {/*<h1 className="baner__title">{movie?.title || movie?.name || movie?.original_name}</h1>*/}

                {/*<h1 className="baner__description">{movie?.overview}</h1>*/}
            </div>
        </div>
    );
}

export default InfoScreen
