import React, {useEffect} from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {VERIFICATION_ROUTE} from "../../utils/consts";
import {useDispatch, useSelector} from "react-redux";
import {fetchSellersInfoCount} from "../../redux/actions";

const MainModer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sellersInfoCount = useSelector(state => state.moderReducer.sellersInfoCount);

    useEffect(() => dispatch(fetchSellersInfoCount()), []);

    return (
        <Container>
            <Row className={"mt-4"}>
                <Col md={6}>
                    <Card
                        className={"border-radius-10 p-3 cursor-pointer"}
                        onClick={() => {
                            if (sellersInfoCount > 0) {
                                history.push(VERIFICATION_ROUTE);
                            }
                        }}
                    >
                        <div className={"text-center fs-3 fw-bold"}>
                            Верификация
                        </div>
                        <div className={"text-center fs-4"}>
                            {sellersInfoCount} новых заявок
                        </div>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className={"border-radius-10 p-3 cursor-pointer"}>
                        <div className={"text-center fs-3 fw-bold"}>
                            Поддержка
                        </div>
                        <div className={"text-center fs-4"}>
                            N новых обращений
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default MainModer;