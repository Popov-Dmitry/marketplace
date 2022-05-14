import {FETCH_DELIVERIES, FETCH_DELIVERY, SAVE_DELIVERY, UPDATE_DELIVERY} from "./types";

const initialState = {
    deliveries: [],
    currentDelivery: null
}

export const deliveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_DELIVERY:
            const newDeliveries = [ ...state.deliveries ];
            newDeliveries.push(action.payload);
            return { ...state, deliveries: newDeliveries };
        case FETCH_DELIVERY:
            return { ...state, currentDelivery: action.payload };
        case FETCH_DELIVERIES:
            return { ...state, deliveries: action.payload };
        case UPDATE_DELIVERY:
            return { ...state, deliveries: state.deliveries.map(delivery =>
                    action.payload.id === delivery.id ? action.payload : delivery) }
        default:
            return state;
    }
}