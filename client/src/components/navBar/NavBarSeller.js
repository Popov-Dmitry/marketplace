import React from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {MAIN_ROUTE, ORDERS_ROUTE, SELLER_NEW_PRODUCT_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";
import products from "../../assets/products.png";
import addProduct from "../../assets/add-product.png";
import orders from "../../assets/orders.png";
import AccountNav from "./AccountNav";
import {useSelector} from "react-redux";

const NavBarSeller = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth);

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
                    {isAuth &&
                        <div>
                            <NavLink to={ORDERS_ROUTE}>
                                <Image src={orders} width="32px" height="32px" className={"me-3"}/>
                            </NavLink>
                            <NavLink to={SELLER_NEW_PRODUCT_ROUTE}>
                                <Image src={addProduct} width="32px" height="32px" className={"me-3"}/>
                            </NavLink>
                            <NavLink to={SELLER_PRODUCTS_ROUTE}>
                                <Image src={products} width="32px" height="32px" className={"me-3"}/>
                            </NavLink>
                        </div>
                    }
                    <AccountNav/>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarSeller;