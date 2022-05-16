import React from 'react';
import AddressItem from "./AddressItem";
import {useSelector} from "react-redux";

const AddressesList = ({isAddressEditVisible, setIsAddressEditVisible}) => {
    const addresses = useSelector(state => state.deliveryReducer.addresses);

    return (
        <div>
            {addresses.map(address =>
                <AddressItem
                    key={address.id}
                    address={address}
                    isAddressEditVisible={isAddressEditVisible}
                    setIsAddressEditVisible={setIsAddressEditVisible}
                />
            )}
        </div>
    );
};

export default AddressesList;