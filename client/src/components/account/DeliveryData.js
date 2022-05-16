import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import DeliveryEdit from "../modals/DeliveryEdit";
import {fetchDeliveries} from "../../redux/actions";
import DeliveriesList from "../delivery/DeliveriesList";

const DeliveryData = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const [isDeliveryEditVisible, setIsDeliveryEditVisible] = useState(false);

    useEffect(() => dispatch(fetchDeliveries(user.id)), []);

    return (
        <div>
            <div>
                <Button
                    variant={"main"}
                    className={"border-radius-10"}
                    onClick={() => setIsDeliveryEditVisible(true)}
                >
                    Добавить вариант
                </Button>
            </div>
            <div className={"mt-3"}>
                <DeliveriesList isDeliveryEditVisible={isDeliveryEditVisible} setIsDeliveryEditVisible={setIsDeliveryEditVisible}/>
            </div>

            <DeliveryEdit show={isDeliveryEditVisible} onHide={setIsDeliveryEditVisible}/>
        </div>
    );
};

export default DeliveryData;