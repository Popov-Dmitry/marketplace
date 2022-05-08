import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const VerificationsList = () => {
    const sellersInfo = useSelector(state => state.moderReducer.sellersInfo);

    return (
        <Row className={"mt-4"}>
            {sellersInfo.map(info => <Col md={4}>
                    <Card className={"border-radius-10 product-item-param-border p-3 cursor-pointer"}>
                        <div className={"d-flex justify-content-between"}>
                            <div>
                                <div className={"fst-italic"}>{info.id}</div>
                                <div>{info.shopName}</div>
                            </div>
                            <div className={"mt-auto"}>{info.country}</div>
                        </div>
                    </Card>
                </Col>
            )}
        </Row>
    );
};

export default VerificationsList;