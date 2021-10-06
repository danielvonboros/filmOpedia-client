import React, { useContext, useState} from "react";
import {Link} from 'react-router-dom';
import { useHistory } from "react-router";

import axios from "axios";

import {Row, Col, Button} from 'react-bootstrap';

import ProfileEditView from "../profile-edit-view/profile-edit-view";
import LoadingView from "../loading-view/loading-view";

import {AuthData, MovieData} from '../context/context';
import { BASE_PATH } from "../../utils/constants/endpoints";
import { ROUTE_EDIT, ROUTE_USER } from "../../utils/constants/routes";

export function ProfileView(props) {
    const [user, setUser] = useState(null);

    const history = useHistory();
    const authData = useContext(AuthData).authData;
    const movies = useContext(MovieData).movies;

    console.log(user);

    if(authData && !user){
        axios.get(BASE_PATH+'/users/id/'+authData.user._id, {
            headers: { Authorization: `Bearer ${authData.token}` },
          })
          .then((response) => {
              console.log(response);
              setUser(response.data)
            })
          .catch((e) => {
            console.log(e);
          });
    }

    if(!user || !movies){
        return <LoadingView/>
    }

  return (    
        <Row className="justify-content-center">
                    <Col sm={12} md={10} lg={8} xl={6}>
                        <div>
                            
                            <ul className="">
                            <h4>Hello there, {user.username}</h4>
                            <li className="list-group-item">
                                <span className="value">Username: { user.username }</span>
                            </li>
                            <li className="list-group-item">
                                <span className="value">Email: { user.email }</span>
                            </li>
                            { user.birthday ? <li className="list-group-item">
                                <span className="value">Birthday: { user.birthday.slice(0,10) }</span>
                            </li> : null }
                            <li className="movie-director list-group-item">
                                Favorite Movies:
                                {
                                    movies.filter((movie, index) => {
                                        return user.favoritemovies.find(movieId => movieId === movie._id) !== undefined
                                    }).map(movie => <p key={movie._id}>{movie.title}</p>)
                                }
                            </li>
                            <li className="list-group-item">
                                <Link to={`${ROUTE_USER+ROUTE_EDIT}/${authData.user._id}`}>
                                    <Button className="btn btn-warning" variant="danger">
                                        Edit Profile
                                    </Button>
                                </Link>
                                <Button className="btn button-float-right" variant="outline-danger" onClick={() => { history.goBack(); }}>Back</Button>
                            </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
  )
}
