import React from 'react';

import axios from "axios";

import { MovieData, AuthData } from "../context/context";

import { ENDPOINT_MOVIE } from "../../utils/constants/endpoints";

export default class MovieDataHandler extends React.Component {

    static contextType = AuthData;

    constructor() {
        super();
        this.state = {
            movies : null
        }
    }

    getMovieData(token) {
        axios
          .get(ENDPOINT_MOVIE, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            this.setState({
              movies: response.data,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount(){
        console.log("movie-data-handler componentDidMount",this.context);
        if(this.context.authData !== null){
          this.getMovieData(this.context.authData.token)
      }
    }

    componentDidUpdate(prevProps, prevState){
        if(this.context.authData !== null && prevState.movies === null){
            this.getMovieData(this.context.authData.token)
        }
    }

    render() {
        console.log(this.context, 'movie data handler');
        return (
        <MovieData.Provider value={{...this.state}}>
            {this.props.children}
        </MovieData.Provider>
        );
    }
}
