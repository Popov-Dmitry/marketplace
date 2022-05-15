import {
    DELETE_ADDRESS,
    FETCH_ADDRESS,
    FETCH_ADDRESSES,
    FETCH_DELIVERIES,
    FETCH_DELIVERY,
    SAVE_ADDRESS,
    SAVE_DELIVERY, UPDATE_ADDRESS,
    UPDATE_DELIVERY
} from "./types";

const initialState = {
    deliveries: [],
    currentDelivery: null,
    addresses: [],
    mainAddress: null
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
                    action.payload.id === delivery.id ? action.payload : delivery) };
        case SAVE_ADDRESS:
            const newAddresses = [ ...state.addresses ];
            newAddresses.push(action.payload);
            return { ...state, addresses: newAddresses };
        case FETCH_ADDRESS:
            return { ...state, mainAddress: action.payload };
        case FETCH_ADDRESSES:
            return { ...state, addresses: action.payload };
        case UPDATE_ADDRESS:
            return { ...state, addresses: state.addresses.map(address =>
                    action.payload.id === address.id ? action.payload : address) };
        case DELETE_ADDRESS:
            const address = state.addresses.find(a => a.id === action.payload);
            if (address.isMain === true) {
                const newMain = state.addresses.find(a => a.id !== action.payload);
                newMain.isMain = true;
                return { ...state,
                    addresses: state.addresses.filter(a => a.id !== action.payload),
                    mainAddress: newMain };
            }
            else {
                return { ...state, addresses: state.addresses.filter(a => a.id !== action.payload) };
            }
        default:
            return state;
    }
}