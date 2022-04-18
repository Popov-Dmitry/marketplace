import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {useSelector} from "react-redux";
import MyAlert from "./components/MyAlert";

function App() {
    const alert = useSelector(state => state.appReducer.alert);

  return (
    <BrowserRouter>
        <NavBar/>
        <AppRouter/>
        {alert && <MyAlert variant={alert.variant} text={alert.text}/>}
    </BrowserRouter>
  );
}

export default App;
