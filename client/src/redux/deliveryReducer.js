import {
    DELETE_ADDRESS,
    FETCH_ADDRESS,
    FETCH_ADDRESSES,
    FETCH_DELIVERIES,
    FETCH_DELIVERY, FETCH_RUSSIAN_POST_DELIVERY,
    SAVE_ADDRESS,
    SAVE_DELIVERY, SET_CURRENT_ADDRESS, UPDATE_ADDRESS,
    UPDATE_DELIVERY
} from "./types";

const initialState = {
    deliveries: [],
    currentDelivery: null,
    russianPostDelivery: null,
    addresses: [],
    mainAddress: null,
    currentAddress: null
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
            let newAddresses = [ ...state.addresses ];
            if (action.payload.isMain === true) {
                newAddresses = newAddresses.map(a => a.isMain === true ? { ...a, isMain: false } : a);
                newAddresses.push(action.payload);
                return { ...state, addresses: newAddresses, mainAddress: action.payload };
            }
            else {
                newAddresses.push(action.payload);
                return { ...state, addresses: newAddresses };
            }
        case FETCH_ADDRESS:
            return { ...state, mainAddress: action.payload };
        case FETCH_ADDRESSES:
            return { ...state, addresses: action.payload };
        case UPDATE_ADDRESS:
            if (action.payload.isMain === true && state.addresses.find(a => a.id === action.payload.id).isMain !== true) {
                let newAddresses = [ ...state.addresses ];
                newAddresses = newAddresses.map(a => a.isMain === true ? { ...a, isMain: false } : a)
                    .map(address => action.payload.id === address.id ? action.payload : address);
                return { ...state, addresses: newAddresses, mainAddress: action.payload };
            }
            else {
                return { ...state, addresses: state.addresses.map(address =>
                        action.payload.id === address.id ? action.payload : address) };
            }
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
        case SET_CURRENT_ADDRESS:
            return { ...state, currentAddress: action.payload };
        case FETCH_RUSSIAN_POST_DELIVERY:
            return { ...state, russianPostDelivery: action.payload };
        default:
            return state;
    }
}