import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import AddressEdit from "../modals/AddressEdit";
import {useDispatch, useSelector} from "react-redux";
import {fetchAddresses} from "../../redux/actions";
import AddressesList from "../delivery/AddressesList";

const AddressData = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user)
    const [isAddressEditVisible, setIsAddressEditVisible] = useState(false);

    useEffect(() => dispatch(fetchAddresses(user.id)), []);

    return (
        <div>
            <Button
                variant={"main"}
                className={"border-radius-10"}
                onClick={() => setIsAddressEditVisible(true)}
            >
                Добавить адрес доставки
            </Button>
            <div className={"mt-3"}>
                <AddressesList isAddressEditVisible={isAddressEditVisible} setIsAddressEditVisible={setIsAddressEditVisible}/>
            </div>

            <AddressEdit show={isAddressEditVisible} onHide={setIsAddressEditVisible}/>
        </div>
    );
};

export default AddressData;