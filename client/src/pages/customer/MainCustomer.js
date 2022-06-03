import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import women from "../../assets/images/women.jpg"
import men from "../../assets/images/men.jpg"
import kids from "../../assets/images/kids.jpg"
import CarouselMainPage from "../../components/CarouselMainPage";

const MainCustomer = () => {
    return (
        <Container className={"mb-4 mt-2"}>
            <CarouselMainPage/>
            <div className={"mt-2 fs-2 fw-bold "}>
                Одежда
            </div>
            <Row className={"mt-2"}>
                <Col>
                    <Card
                        className={"border-radius-10 fs-4 fw-bold d-flex align-items-center justify-content-center cursor-pointer"}
                    >
                        <Card.Img
                            src={women}
                            className={"text-center ratio-3x4 border-radius-10"}
                            alt={"Женская"}
                        />
                        Женская
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={"border-radius-10 fs-4 fw-bold d-flex align-items-center justify-content-center cursor-pointer"}
                    >
                        <Card.Img
                            src={men}
                            className={"text-center ratio-3x4 border-radius-10"}
                            alt={"Мужская"}
                        />
                        Мужская
                    </Card>
                </Col>
                <Col>
                    <Card
                        className={"border-radius-10 fs-4 fw-bold d-flex align-items-center justify-content-center cursor-pointer"}
                    >
                        <Card.Img
                            src={kids}
                            className={"text-center ratio-3x4 border-radius-10"}
                            alt={"Детская"}
                        />
                        Детская
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MainCustomer;
