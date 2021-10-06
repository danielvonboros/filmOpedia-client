import React, {useContext} from 'react';

import { BrowserRouter, Route, Redirect, Link } from "react-router-dom";

import Switch from 'react-bootstrap/esm/Switch';

import {LoginView} from '../login-view/login-view';
import MovieView from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import MovieList from '../movie-list/movie-list';
import { ProfileView } from '../profile-view/profile-view';

import { AuthData } from '../context/context';
import { ROUTE_DIRECTOR, ROUTE_GENRE, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_MOVIE, ROUTE_MOVIE_ID, ROUTE_USER, ROUTE_USER_ID, ROUTE_EDIT } from '../../utils/constants/routes';
import PageWrapper from '../page-wrapper/page-wrapper';
import ProfileEditView from '../profile-edit-view/profile-edit-view';

export default function Router(props) {

    const context = useContext(AuthData);
    console.log("router", context);

        if(context.authData === null){
          return(
            <BrowserRouter>
              <Redirect to={ROUTE_LOGIN}></Redirect>
              <Switch>
              <Route path={ROUTE_LOGIN} component={LoginView}/>
              </Switch>
            </BrowserRouter>
          )
        }

        return (
            <BrowserRouter>
              <PageWrapper>
                <Switch>
                    <Route exact path={ROUTE_MAIN} component={MovieList}/>
                    <Route exact path={ROUTE_MOVIE+ROUTE_MOVIE_ID} component={MovieView}/>
                    <Route exact path={ROUTE_USER+ROUTE_USER_ID} component={ProfileView} />
                    <Route path={ROUTE_USER+ROUTE_EDIT+ROUTE_USER_ID} component={ProfileEditView} />
                    <Route path={ROUTE_MOVIE+ROUTE_MOVIE_ID+ROUTE_DIRECTOR} component={DirectorView}/>
                    <Route path={ROUTE_MOVIE+ROUTE_MOVIE_ID+ROUTE_GENRE} component={GenreView}/>
                </Switch>
              </PageWrapper>
            </BrowserRouter>
        )
    }