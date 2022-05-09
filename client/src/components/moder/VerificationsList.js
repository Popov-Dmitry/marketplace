import React from 'react';
import {Col, Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import VerificationItem from "./VerificationItem";

const VerificationsList = () => {
    const sellersInfo = useSelector(state => state.moderReducer.sellersInfo);

    return (
        <Row className={"mt-4"}>
            {sellersInfo.map(info =>
                <Col key={info.id} md={4}>
                    <VerificationItem info={info}/>
                </Col>
            )}
        </Row>
    );
};

export default VerificationsList;