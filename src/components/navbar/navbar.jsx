import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { ROUTE_LOGIN, ROUTE_USER } from "../../utils/constants/routes";


import { deleteFromLocalStorage } from "../../utils/local-storage";
import { AuthData } from "../context/context";

export default function NavBar(){
    const history = useHistory();
    const context = useContext(AuthData);

    const logout = () => {
        console.log("logout");
        deleteFromLocalStorage('authData');
        context.setAuthData(null);
        history.push(ROUTE_LOGIN);
    }

    return(
        <Navbar>
            <Link to={`${ROUTE_USER}/${context.authData.user._id}`}>
                <Button>Profil</Button>
            </Link>
            <Button onClick={() => logout()}>
                Sign Out
            </Button>
        </Navbar>
    );
}