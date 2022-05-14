import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBarCustomer from "./components/navBar/NavBarCustomer";
import {useDispatch, useSelector} from "react-redux";
import MyAlert from "./components/MyAlert";
import {CUSTOMER, MODER, SELLER} from "./utils/roles";
import {fetchUserById, setUserRole} from "./redux/actions";
import NavBarSeller from "./components/navBar/NavBarSeller";
import NavBarModer from "./components/navBar/NavBarModer";

function App() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.appReducer.alert);

    const domainArr = window.location.host.split(".");
    const userRole = domainArr.length > 1 ? domainArr[0].toUpperCase() : CUSTOMER;
    dispatch(setUserRole(userRole));

    if (localStorage.getItem("userId") && localStorage.getItem("token")) {
        dispatch(fetchUserById(userRole, localStorage.getItem("userId")));
    }

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
