import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useSelector} from "react-redux";
import MyAlert from "./components/MyAlert";
import {CUSTOMER, SELLER} from "./utils/roles";

function App() {
    const alert = useSelector(state => state.appReducer.alert);

    const domainArr = window.location.host.split(".");

    return (
        <BrowserRouter>
            {domainArr.length > 1 ?
                domainArr[0] === "seller" && <AppRouter userRole={SELLER}/>
                :
                <div>
                    <NavBar/>
                    <AppRouter userRole={CUSTOMER}/>
                </div>
            }
            {alert && <MyAlert variant={alert.variant} text={alert.text}/>}
        </BrowserRouter>
    );
}

export default App;
