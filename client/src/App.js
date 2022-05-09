import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBarCustomer from "./components/navBar/NavBarCustomer";
import {useDispatch, useSelector} from "react-redux";
import MyAlert from "./components/MyAlert";
import {CUSTOMER} from "./utils/roles";
import {setUserRole} from "./redux/actions";
import NavBarSeller from "./components/navBar/NavBarSeller";

function App() {
    const dispatch = useDispatch();
    const alert = useSelector(state => state.appReducer.alert);

    const domainArr = window.location.host.split(".");
    dispatch(setUserRole(domainArr.length > 1 ? domainArr[0].toUpperCase() : CUSTOMER))

    return (
        <BrowserRouter>
            {domainArr.length > 1 ?
                <div>
                    {domainArr[0] === "seller" && <NavBarSeller/>}
                    {/*{domainArr[0] === "moder" && <AppRouter/>}*/}
                </div>
                :
                <NavBarCustomer/>
            }
            <AppRouter/>
            {alert && <MyAlert variant={alert.variant} text={alert.text}/>}
        </BrowserRouter>
    );
}

export default App;
