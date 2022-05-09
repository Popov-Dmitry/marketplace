import React from 'react';
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {VERIFICATION_ROUTE} from "../../utils/consts";

const VerificationItem = ({info}) => {
    const history = useHistory();

    return (
        <Card
            className={"border-radius-10 product-item-param-border p-3 cursor-pointer grey-hover"}
            onClick={() => history.push(VERIFICATION_ROUTE + "/" + info.id)}
        >
            <div className={"d-flex justify-content-between"}>
                <div>
                    <div className={"fst-italic"}>{info.id}</div>
                    <div>{info.shopName}</div>
                </div>
                <div className={"mt-auto"}>{info.country}</div>
            </div>
        </Card>
    );
};

export default VerificationItem;