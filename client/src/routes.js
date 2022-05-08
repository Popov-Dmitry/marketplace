import {
    ACCOUNT_ADDRESSES_ROUTE,
    ACCOUNT_CARDS_ROUTE,
    ACCOUNT_PERSONAL_ROUTE,
    ACCOUNT_ROUTE,
    ACCOUNT_SECURITY_ROUTE,
    CART_ROUTE,
    CLOTHES_ROUTE,
    EDIT_PRODUCT_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    NEW_PRODUCT_ROUTE,
    REGISTRATION_ROUTE,
    SEARCH_ROUTE,
    SELLER_NEW_PRODUCT_ROUTE,
    SELLER_PRODUCTS_ROUTE,
    SELLER_SHOP_ROUTE
} from "./utils/consts";
import Main from "./pages/Main";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Landing from "./pages/seller/Landing";
import Registration from "./pages/seller/Registration";
import Login from "./pages/seller/Login";
import NewProduct from "./pages/seller/NewProduct";
import Products from "./pages/seller/Products";
import ProductEdit from "./pages/seller/ProductEdit";

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
        path: SELLER_SHOP_ROUTE,
        Component: Account
    },
    {
        path: SELLER_NEW_PRODUCT_ROUTE,
        Component: NewProduct
    },
    {
        path: SELLER_PRODUCTS_ROUTE,
        Component: Products
    },
    {
        path: SELLER_PRODUCTS_ROUTE + "/:detailsId" + EDIT_PRODUCT_ROUTE,
        Component: ProductEdit
    },
    {
        path: SELLER_PRODUCTS_ROUTE + "/:detailsId" + "/:id" + EDIT_PRODUCT_ROUTE,
        Component: ProductEdit
    },
    {
        path: SELLER_PRODUCTS_ROUTE + "/:detailsId" + NEW_PRODUCT_ROUTE,
        Component: ProductEdit
    }
];