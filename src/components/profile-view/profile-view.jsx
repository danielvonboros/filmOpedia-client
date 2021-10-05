import React, { useContext, useState} from "react";
import { useHistory } from "react-router";

import axios from "axios";

import {Row, Col, Button} from 'react-bootstrap';

import ProfileEditView from "../profile-edit-view/profile-edit-view";
import LoadingView from "../loading-view/loading-view";

import {AuthData, MovieData} from '../context/context';
import { BASE_PATH } from "../../utils/constants/endpoints";

export function ProfileView(props) {
    const [user, setUser] = useState(null);
    const [edit, setEdit] = useState(false);

    const history = useHistory();
    const authData = useContext(AuthData).authData;
    const movies = useContext(MovieData).movies;

    function editProfile() {
        setEdit(true);
    }

    if(authData && !user){
        axios.get(BASE_PATH+'/users/'+authData.user.username, {
            headers: { Authorization: `Bearer ${authData.token}` },
          })
          .then((response) => {setUser(response.data)})
          .catch((e) => {
            console.log(e);
          });
    }

    if(!user || !movies){
        return <LoadingView/>
    }

    if (edit) {
        return <ProfileEditView/>
    }

  return (    
        <Row className="justify-content-center">
            <Button className="button-float-right" onClick={() => editProfile()}></Button>
                    <Col sm={12} md={10} lg={8} xl={6}>
                        <div>
                            <ul className="">
                            <li className="list-group-item">
                                <span className="value">{ user.username }</span>
                            </li>
                            <li className="list-group-item">
                                <span className="value">{ user.email }</span>
                            </li>
                            <li className="list-group-item">
                                <span className="value">{ user.birthday.slice(0,10) }</span>
                            </li>
                            <li className="movie-director list-group-item">
                                {
                                    movies.filter((movie, index) => {
                                        console.log(movie, index);
                                
                                        return user.favoritemovies.find(movieId => movieId === movie._id) !== undefined
                                    }).map(movie => <p key={movie._id}>{movie.title}</p>)
                                }
                            </li>
                            <li className="list-group-item">
                                <Button className="button-float-right" variant="outline-danger" onClick={() => { history.goBack(); }}>Back</Button>
                            </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
  )
}
