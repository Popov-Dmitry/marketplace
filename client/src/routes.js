import {
    ACCOUNT_ADDRESSES_ROUTE,
    ACCOUNT_CARDS_ROUTE,
    ACCOUNT_PERSONAL_ROUTE,
    ACCOUNT_ROUTE,
    ACCOUNT_SECURITY_ROUTE, CART_ROUTE, CLOTHES_ROUTE, LOGIN_ROUTE,
    MAIN_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE
} from "./utils/consts";
import Main from "./pages/Main";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Landing from "./pages/seller/Landing";
import Registration from "./pages/seller/Registration";
import Login from "./pages/seller/Login";

export const publicCustomerRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: SEARCH_ROUTE,
        Component: Search
    },
    {
        path: CLOTHES_ROUTE + "/:detailsId" + "/:id",
        Component: Product
    }
];

export const authCustomerRoutes = [
    {
        path: ACCOUNT_ROUTE,
        Component: Account
    },
    {
        path: ACCOUNT_PERSONAL_ROUTE,
        Component: Account
    },
    {
        path: ACCOUNT_SECURITY_ROUTE,
        Component: Account
    },
    {
        path: ACCOUNT_CARDS_ROUTE,
        Component: Account
    },
    {
        path: ACCOUNT_ADDRESSES_ROUTE,
        Component: Account
    },
    {
        path: CART_ROUTE,
        Component: Cart
    }
];

export const publicSellerRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Landing
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
];

export const authSellerRoutes = [

];