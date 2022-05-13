import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearPhotoStore, fetchOrders, fetchPhotosNames} from "../../redux/actions";
import {CUSTOMER} from "../../utils/roles";
import OrderItem from "./OrderItem";

const OrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => dispatch(fetchOrders(CUSTOMER, user.id)), []);
    useEffect(() => {
        dispatch(clearPhotoStore());
        orders.forEach(order =>
            dispatch(fetchPhotosNames(order.productType, order.productDetailsId, order.productId)));
    }, [orders]);

    return (
        <div>
            {orders.map(order => <OrderItem key={order.id} order={order}/>)}
        </div>
    );
};

export default OrdersList;