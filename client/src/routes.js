import {
    ACCOUNT_ADDRESSES_ROUTE,
    ACCOUNT_CARDS_ROUTE,
    ACCOUNT_PERSONAL_ROUTE,
    ACCOUNT_ROUTE,
    ACCOUNT_SECURITY_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Account from "./pages/Account";

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
];

export const authRoutes = [
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
];