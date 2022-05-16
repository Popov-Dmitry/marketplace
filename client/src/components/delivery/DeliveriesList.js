import React from 'react';
import {useSelector} from "react-redux";
import DeliveryItem from "./DeliveryItem";

const DeliveriesList = ({isDeliveryEditVisible, setIsDeliveryEditVisible, deliveryId, setDeliveryId}) => {
    const deliveries = useSelector(state => state.deliveryReducer.deliveries);

    return (
        <div>
            {deliveries.map(delivery =>
                <DeliveryItem
                    key={delivery.id}
                    delivery={delivery}
                    isDeliveryEditVisible={isDeliveryEditVisible}
                    setIsDeliveryEditVisible={setIsDeliveryEditVisible}
                    deliveryId={deliveryId}
                    setDeliveryId={setDeliveryId}
                />
            )}
        </div>
    );
};

export default DeliveriesList;