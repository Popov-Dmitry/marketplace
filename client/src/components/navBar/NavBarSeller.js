import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE, SELLER_NEW_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";
import products from "../../assets/products.png";
import addProduct from "../../assets/add-product.png";
import AccountNav from "./AccountNav";

const NavBarSeller = () => {
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
                    <AccountNav/>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarSeller;