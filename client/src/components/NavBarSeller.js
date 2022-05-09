import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useHistory} from "react-router-dom";
import {ACCOUNT_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, SELLER_NEW_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../utils/consts";
import {useSelector} from "react-redux";
import account from "../assets/user.png";
import login from "../assets/login.png";
import products from "../assets/products.png";
import addProduct from "../assets/add-product.png";

const NavBarSeller = () => {
    const history = useHistory();
    const userReducer = useSelector(state => state.userReducer);

    return (
        <Navbar bg={"light"} variant={"light"}>
            <Container>
                <Navbar.Brand>
                    <NavLink
                        to={MAIN_ROUTE}
                        className={"nav-title fs-3 text-uppercase text-decoration-none"}>
                        КЛАДОВКА  <span className={"text-black opacity-95 text-lowercase"}>seller</span>
                    </NavLink>
                </Navbar.Brand>
                <Nav>
                    <NavLink to={SELLER_NEW_PRODUCT_ROUTE}>
                        <Image src={addProduct} width="32px" height="32px" className={"me-3"}/>
                    </NavLink>
                    <NavLink to={SELLER_PRODUCTS_ROUTE}>
                        <Image src={products} width="32px" height="32px" className={"me-3"}/>
                    </NavLink>
                    {userReducer.isAuth ?
                        <NavLink to={ACCOUNT_ROUTE}>
                            <Image src={account} width="32px" height="32px"/>
                        </NavLink>
                        :
                        <Image
                            src={login}
                            width="32px"
                            height="32px"
                            className={"cursor-pointer"}
                            onClick={() => history.push(LOGIN_ROUTE)}
                        />
                    }
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarSeller;