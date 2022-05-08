import React from 'react';
import {Card} from "react-bootstrap";

const VerificationItem = ({info}) => {
    return (
        <Card className={"border-radius-10 product-item-param-border p-3 cursor-pointer"}>
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