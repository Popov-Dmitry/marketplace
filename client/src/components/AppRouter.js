import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    authCustomerRoutes,
    authModerRoutes,
    authSellerRoutes,
    publicCustomerRoutes, publicModerRoutes,
    publicSellerRoutes
} from "../routes";
import {LOGIN_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {ADMIN, CUSTOMER, MODER, SELLER} from "../utils/roles";

const AppRouter = () => {
    const userReducer = useSelector(state => state.userReducer);

    return (
        <Switch>
            {userReducer.userRole === CUSTOMER && userReducer.isAuth && authCustomerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === CUSTOMER && publicCustomerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === SELLER && userReducer.isAuth && authSellerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === SELLER && publicSellerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === MODER && userReducer.isAuth && authModerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === MODER && publicModerRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {userReducer.userRole === MODER || userReducer.userRole === ADMIN ?
                <Redirect to={LOGIN_ROUTE}/>
                :
                <Redirect to={MAIN_ROUTE}/>
            }

        </Switch>
    );
};

export default AppRouter;