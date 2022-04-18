import React from 'react';
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import personalData from "../assets/id-card.png";
import security from "../assets/security.png";
import purse from "../assets/purse.png";
import addresses from "../assets/location.png";
import PersonalData from "../components/account/PersonalData";
import {useHistory, useLocation} from "react-router-dom";
import {
    ACCOUNT_ADDRESSES_ROUTE,
    ACCOUNT_CARDS_ROUTE,
    ACCOUNT_PERSONAL_ROUTE,
    ACCOUNT_SECURITY_ROUTE
} from "../utils/consts";
import Security from "../components/account/Security";

const Account = () => {
    const location = useLocation();
    const history = useHistory();

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
                </Col>
                <Col>
                    {location.pathname === ACCOUNT_PERSONAL_ROUTE && <PersonalData/>}
                    {location.pathname === ACCOUNT_SECURITY_ROUTE && <Security/>}
                </Col>
            </Row>
        </Container>
    );
};

export default Account;