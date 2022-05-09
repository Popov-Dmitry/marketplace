import React, {useState} from 'react';
import {Button, Container, Dropdown, Form, Image, Nav, Navbar} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import {ACCOUNT_ROUTE, CART_ROUTE, MAIN_ROUTE, WISHLIST_ROUTE} from "../utils/consts";
import catalog from "../assets/catalog.png";
import search from "../assets/search.png";
import account from "../assets/user.png";
import login from "../assets/login.png";
import cart from "../assets/bag.png";
import favorite from "../assets/heart.png";
import "../styles/App.css";
import "../styles/NavBar.css";
import NavBarCategoriesList from "./NavBarCategoriesList";
import {boys, girls, men, women} from "../utils/categories";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Auth from "./modals/Auth";

const NavBar = () => {
    const user = useSelector(state => state.userReducer);
    const [authVisible, setAuthVisible] = useState(false);

    return (
        <Navbar bg={"light"} variant={"light"}>
            <Container>
                <Navbar.Brand>
                    <NavLink
                        to={MAIN_ROUTE}
                        className={"nav-title fs-3 text-uppercase text-decoration-none"}>
                        КЛАДОВКА
                    </NavLink>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Dropdown>
                        <DropdownToggle
                            variant={"main"}
                            className={"d-flex justify-content-lg-between align-items-center nav-catalog-btn"}
                        >
                            <Image src={catalog} width="25px" height="25px"/>
                            <div className="fs-5 ms-2">
                                Каталог
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>
                                Одежда
                                <DropdownMenu className={"dropdown-submenu"}>
                                    <DropdownItem>
                                        Женщинам
                                        <NavBarCategoriesList categories={women}/>
                                    </DropdownItem>
                                    <DropdownItem>
                                        Мужчинам
                                        <NavBarCategoriesList categories={men}/>
                                    </DropdownItem>
                                    <DropdownItem>
                                        Девочкам
                                        <NavBarCategoriesList categories={girls}/>
                                    </DropdownItem>
                                    <DropdownItem>
                                        Мальчикам
                                        <NavBarCategoriesList categories={boys}/>
                                    </DropdownItem>
                                </DropdownMenu>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>

                <Form className={"d-flex justify-content-lg-between align-items-center ms-1 m-auto"}>
                    <Form.Control
                        type={"search"}
                        placeholder={"Искать в Кладовке"}
                        className={"nav-search shadow-none"}
                    />
                    <Button variant={"main"} className={"nav-search-btn"}>
                        <Image src={search} width="25px" height="25px"/>
                    </Button>
                </Form>

                <Nav>
                    <NavLink to={CART_ROUTE}>
                        <Image src={cart} width="36px" height="36px" className={"me-3"}/>
                    </NavLink>
                    <NavLink to={WISHLIST_ROUTE}>
                        <Image src={favorite} width="35px" height="35px" className={"me-3"}/>
                    </NavLink>
                    {user.isAuth ?
                        <NavLink to={ACCOUNT_ROUTE}>
                            <Image src={account} width="32px" height="32px"/>
                        </NavLink>
                        :
                        <Image
                            src={login}
                            width="32px"
                            height="32px"
                            className={"cursor-pointer"}
                            onClick={() => setAuthVisible(true)}
                        />
                    }
                    <Auth show={authVisible} onHide={setAuthVisible}/>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;