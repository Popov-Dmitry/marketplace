import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE, VERIFICATION_ROUTE} from "../../utils/consts";
import AccountNav from "./AccountNav";
import requests from "../../assets/requests.png";

const NavBarModer = () => {

    return (
        <Navbar bg={"light"} variant={"light"}>
            <Container>
                <Navbar.Brand>
                    <NavLink
                        to={MAIN_ROUTE}
                        className={"nav-title fs-3 text-uppercase text-decoration-none"}>
                        КЛАДОВКА  <span className={"text-black opacity-95 text-lowercase"}>moder</span>
                    </NavLink>
                </Navbar.Brand>
                <Nav>
                    <NavLink to={VERIFICATION_ROUTE}>
                        <Image src={requests} width="32px" height="32px" className={"me-3"}/>
                    </NavLink>
                    <AccountNav/>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarModer;