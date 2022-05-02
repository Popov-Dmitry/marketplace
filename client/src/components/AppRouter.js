import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {authCustomerRoutes, authSellerRoutes, publicCustomerRoutes, publicSellerRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {CUSTOMER, SELLER} from "../utils/roles";

const AppRouter = ({userRole}) => {
    const isAuth = useSelector(state => state.userReducer.isAuth);

    return (
        <Switch>
            {userRole === CUSTOMER && isAuth && authCustomerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userRole === CUSTOMER && publicCustomerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userRole === SELLER && isAuth && authSellerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userRole === SELLER && publicSellerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;