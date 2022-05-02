import React from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import personalData from "../assets/id-card.png";
import security from "../assets/security.png";
import purse from "../assets/purse.png";
import addresses from "../assets/location.png";
import shop from "../assets/shop.png";
import PersonalData from "../components/account/PersonalData";
import {useHistory, useLocation} from "react-router-dom";
import {
    ACCOUNT_ADDRESSES_ROUTE,
    ACCOUNT_CARDS_ROUTE,
    ACCOUNT_PERSONAL_ROUTE,
    ACCOUNT_SECURITY_ROUTE, SELLER_SHOP_ROUTE
} from "../utils/consts";
import Security from "../components/account/Security";
import {useSelector} from "react-redux";
import {CUSTOMER, SELLER} from "../utils/roles";
import ShopData from "../components/account/ShopData";

const Account = () => {
    const location = useLocation();
    const history = useHistory();
    const userRole = useSelector(state => state.userReducer.userRole);

    return (
        <Container>
            <Row className={"mt-4"}>
                <Col md={3}>
                   <div>
                       <Button
                           variant={"light"}
                           className={`w-100 text-start ps-3 ${location.pathname === ACCOUNT_PERSONAL_ROUTE && "main-color"}`}
                           onClick={() => history.push(ACCOUNT_PERSONAL_ROUTE)}
                       >
                           <Image
                               src={personalData}
                               width="25px"
                               height="25px"
                               className={`me-2 ${location.pathname === ACCOUNT_PERSONAL_ROUTE && "black-to-main"}`}
                           />
                           Личные данные
                       </Button>
                   </div>
                    <div>
                        <Button
                            variant={"light"}
                            className={`w-100 text-start ps-3 ${location.pathname === ACCOUNT_SECURITY_ROUTE && "main-color"}`}
                            onClick={() => history.push(ACCOUNT_SECURITY_ROUTE)}
                        >
                            <Image
                                src={security}
                                width="25px"
                                height="25px"
                                className={`me-2 ${location.pathname === ACCOUNT_SECURITY_ROUTE && "black-to-main"}`}
                            />
                            Безопасность и вход
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant={"light"}
                            className={`w-100 text-start ps-3 ${location.pathname === ACCOUNT_CARDS_ROUTE && "main-color"}`}
                            onClick={() => history.push(ACCOUNT_CARDS_ROUTE)}
                        >
                            <Image
                                src={purse}
                                width="25px"
                                height="25px"
                                className={`me-2 ${location.pathname === ACCOUNT_CARDS_ROUTE && "black-to-main"}`}
                            />
                            Кошелёк
                        </Button>
                    </div>
                    {userRole === CUSTOMER &&
                        <div>
                            <Button
                                variant={"light"}
                                className={`w-100 text-start ps-3 ${location.pathname === ACCOUNT_ADDRESSES_ROUTE && "main-color"}`}
                                onClick={() => history.push(ACCOUNT_ADDRESSES_ROUTE)}
                            >
                                <Image
                                    src={addresses}
                                    width="25px"
                                    height="25px"
                                    className={`me-2 ${location.pathname === ACCOUNT_ADDRESSES_ROUTE && "black-to-main"}`}
                                />
                                Адреса
                            </Button>
                        </div>
                    }
                    {userRole === SELLER &&
                        <div>
                            <Button
                                variant={"light"}
                                className={`w-100 text-start ps-3 ${location.pathname === SELLER_SHOP_ROUTE && "main-color"}`}
                                onClick={() => history.push(SELLER_SHOP_ROUTE)}
                            >
                                <Image
                                    src={shop}
                                    width="25px"
                                    height="25px"
                                    className={`me-2 ${location.pathname === SELLER_SHOP_ROUTE && "black-to-main"}`}
                                />
                                Магазин
                            </Button>
                        </div>
                    }
                </Col>
                <Col>
                    {location.pathname === ACCOUNT_PERSONAL_ROUTE && <PersonalData/>}
                    {location.pathname === ACCOUNT_SECURITY_ROUTE && <Security/>}
                    {location.pathname === SELLER_SHOP_ROUTE && <ShopData/>}
                </Col>
            </Row>
        </Container>
    );
};

export default Account;