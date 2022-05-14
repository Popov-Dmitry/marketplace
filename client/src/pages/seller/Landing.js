import React from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {
    REGISTRATION_ROUTE
} from "../../utils/consts";
import business from "../../assets/business.png"
import steps from "../../assets/steps.png"

const Landing = () => {
    const history = useHistory();

    return (
        <div>
            <Container>
                <Row className={"mt-4"}>
                    <Col className={"d-flex flex-column justify-content-center"}>
                        <div className={"fs-2 fw-bold"}>
                            Откройте магазин в Кладовке
                            <br/>
                            всего в несколько кликов!
                        </div>
                        <Button
                            variant={"main"}
                            size={"lg"}
                            className={"mt-3 w-50 border-radius-50"}
                            onClick={() => history.push(REGISTRATION_ROUTE)}
                        >
                            Начать продавать
                        </Button>
                    </Col>
                    <Col>
                        <Image src={business}/>
                    </Col>
                </Row>
            </Container>
            <div className={"background-light"}>
                <Container>
                    <Row className={"p-4"}>
                        <Col md={4}>
                            <Image src={steps} className={"mt-5 mb-5"}/>
                        </Col>
                        <Col>
                            <div className={"fs-2 fw-bold"}>3 простых шага для старта продаж</div>
                            <div className={"fs-4"}>
                                <div className={"mt-4"}>1. Зарегистрируйтесь в личном кабинете</div>
                                <div className={"mt-5"}>2. Загрузите товары</div>
                                <div className={"mt-5"}>3. Настройте вывод средств</div>
                            </div>
                            <div className={"d-flex justify-content-center"}>
                                <Button
                                    variant={"main"}
                                    size={"lg"}
                                    className={"mt-6 w-75 border-radius-50"}
                                    onClick={() => history.push(REGISTRATION_ROUTE)}
                                >
                                    Начать продавать
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className={"d-flex justify-content-between mt-5"}>
                    <Card className={"border-radius-10 shadow-lg p-4 w-50"}>
                        <div className={"fs-4 fw-bold text-center"}>Быстрая регистрация</div>
                        <div className={"fs-5 mt-4 mb-4"}>
                            Зарегистрируйтесь и откройте магазин в Кладовке всего в несколько кликов
                        </div>
                    </Card>
                    <Card className={"border-radius-10 shadow-lg p-4 ms-4 w-50"}>
                        <div className={"fs-4 fw-bold text-center"}>Удобное добавление товаров</div>
                        <div className={"fs-5 mt-4 mb-4"}>
                            Несколько простых шагов и ваш товар доступен для покупки множеству пользователей
                        </div>
                    </Card>
                    <Card className={"border-radius-10 shadow-lg p-4 ms-4 w-50"}>
                        <div className={"fs-4 fw-bold text-center"}>Выгодная продажа</div>
                        <div className={"fs-5 mt-4 mb-4"}>
                            Мы удерживаем 1-5% комиссии с каждой сделки, в зависимости от категории товара
                        </div>
                    </Card>
                </div>
                <div className={"mt-5 mb-5"}>
                    <div className={"fs-2 fw-bold text-center"}>
                        Начните продавать свои товары в Кладовке<br/>
                        и развивайте бизнес вместе с нами
                    </div>
                    <div className={"d-flex justify-content-center"}>
                        <Button
                            variant={"main"}
                            size={"lg"}
                            className={"mt-4 mb-2 w-25 border-radius-50"}
                            onClick={() => history.push(REGISTRATION_ROUTE)}
                        >
                            Начать продавать
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Landing;