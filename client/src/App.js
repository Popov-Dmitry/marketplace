import React, {useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBarCustomer from "./components/navBar/NavBarCustomer";
import {useDispatch, useSelector} from "react-redux";
import MyAlert from "./components/MyAlert";
import {CUSTOMER, MODER, SELLER} from "./utils/roles";
import {fetchCart, fetchUserById, fetchWishlist, setUserRole} from "./redux/actions";
import NavBarSeller from "./components/navBar/NavBarSeller";
import NavBarModer from "./components/navBar/NavBarModer";

let isInit = true;
function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const alert = useSelector(state => state.appReducer.alert);

    const domainArr = window.location.host.split(".");
    const userRole = domainArr.length > 1 ? domainArr[0].toUpperCase() : CUSTOMER;
    if (isInit === true) {
        dispatch(setUserRole(userRole));

        if (localStorage.getItem("userId") && localStorage.getItem("token")) {
            dispatch(fetchUserById(userRole, localStorage.getItem("userId")));
        }
        isInit = false;
    }


    useEffect(() => {
        if (userRole === CUSTOMER && isAuth === true && user.hasOwnProperty("id")) {
            dispatch(fetchCart(user.id));
            dispatch(fetchWishlist(CUSTOMER, user.id));
        }
    }, [isAuth]);

    return (
        <BrowserRouter>
            {userRole === CUSTOMER && <NavBarCustomer/>}
            {userRole === SELLER && <NavBarSeller/>}
            {userRole === MODER && <NavBarModer/>}
            <AppRouter/>
            {alert && <MyAlert variant={alert.variant} text={alert.text}/>}
        </BrowserRouter>
    );
}

export default App;
