import React from 'react';
import {Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {setCurrentAddress} from "../../redux/actions";

const AddressItem = ({address, isAddressEditVisible, setIsAddressEditVisible}) => {
    const dispatch = useDispatch();

    return (
        <Card
            className={"mt-2 border-radius-10 shadow-sm p-2 fs-5 cursor-pointer"}
            onClick={() => {
                dispatch(setCurrentAddress(address));
                setIsAddressEditVisible(true);
            }}
        >
            <div className={"d-flex justify-content-between"}>
                <div>
                    <div>{address.index}</div>
                    <div>{address.address}</div>
                </div>
                <div className={"fw-bold"}>{address.isMain && "Основной"}</div>
            </div>
        </Card>
    );
};

export default AddressItem;