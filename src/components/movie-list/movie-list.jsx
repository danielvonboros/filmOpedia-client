import React, {useContext, useEffect} from 'react';
import {MovieCard} from '../movie-card/movie-card';

import Col from 'react-bootstrap/Col';
import { Row } from 'react-bootstrap';
import { AuthData, MovieData } from "../context/context";
import LoadingView from '../loading-view/loading-view';

export default function MovieList() {
    const movies = useContext(MovieData).movies;

    useEffect(()=>{console.log(movies, "in use effect")},[movies]);

    console.log(console.log("hi"), "console log");


    function sayHello(){};
    sayHello();

    if (movies === null) {
      return <LoadingView/>
    }

      
        return (
            <div>
              <Row>
                {movies.map((movie) => (
                <Col md={3} key={movie._id}>
                  <MovieCard movie={movie} />
                </Col> ))}
              </Row>
            </div>
        
        )

                
}