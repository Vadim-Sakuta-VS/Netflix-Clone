import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../Requests';
import Nav from '../elements/Nav'
import './InfoScreen.css'

function InfoScreen() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    //console.log(movie);

    return (
        <div className="infoScreen" style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,

        }}>
            <div className="infoScreen_gradient" />
            
            <div className="baner__contents">
                <h1 className="baner__title">{movie?.title || movie?.name || movie?.original_name}</h1>

                <h1 className="baner__description">{movie?.overview}</h1>
            </div>
            
        </div>
    );
}

export default InfoScreen
