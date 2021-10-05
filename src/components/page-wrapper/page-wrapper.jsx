import React from "react";
import NavBar from "../navbar/navbar";
import { Container } from "react-bootstrap";

export default function PageWrapper(props) {
    return(
        <>
            <NavBar />
            <Container>
                {props.children}
            </Container>
        </>
    )
}