import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {clearPhotoStore, fetchOrders, fetchPhotosNames} from "../../redux/actions";
import OrderItem from "./OrderItem";

const OrdersList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orderReducer.orders);
    const userReducer = useSelector(state => state.userReducer);

    useEffect(() => dispatch(fetchOrders(userReducer.userRole, userReducer.user.id)), []);
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