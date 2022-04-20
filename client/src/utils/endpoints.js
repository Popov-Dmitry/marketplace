export const AUTH = "/auth/";

export const ADD_ADMIN = "/admins/";
export const GET_ADMIN = "/admins/"; //{id}
export const UPDATE_ADMIN = "/admins/"; //{id}
export const DELETE_ADMIN = "/admins/"; //{id}

export const ADD_CART = "/carts/";
export const GET_CART = "/carts/"; //{id}
export const UPDATE_CART = "/carts/"; //{id}
export const DELETE_CART = "/carts/"; //{id}

export const ADD_CLOTHES = "/clothes/";
export const GET_CLOTHES = "/clothes/"; //{clothesDetailsId}/{clothesId}
export const GET_ALL_CLOTHES_BY_CLOTHES_DETAILS = "/clothes/"; //{clothesDetailsId}
export const UPDATE_CLOTHES = "/clothes/"; //{clothesDetailsId}/{clothesId}
export const UPDATE_CLOTHES_DETAILS = "/clothes/"; //{clothesDetailsId}
export const DELETE_CLOTHES = "/clothes/"; //{clothesDetailsId}/{clothesId}
export const DELETE_CLOTHES_DETAILS = "/clothes/"; //{clothesDetailsId}
export const SEARCH_CLOTHES = "/clothes/search";
export const SEARCH_CLOTHES_PANEL_INFO = "/clothes/search/info/";

export const ADD_CUSTOMER = "/customers/";
export const GET_CUSTOMER = "/customers/"; //{id}
export const UPDATE_CUSTOMER = "/customers/"; //{id}
export const DELETE_CUSTOMER = "/customers/"; //{id}

export const ADD_MODER = "/moders/";
export const GET_MODER = "/moders/"; //{id}
export const UPDATE_MODER = "/moders/"; //{id}
export const DELETE_MODER = "/moders/"; //{id}

export const ADD_PHOTO = "/photos/";
export const GET_PHOTOS_NAMES = "/photos/"; //{productType}/{detailsId}/{id}
export const GET_PHOTO = "/photos/"; //{productType}/{detailsId}/{id}/{name}
export const DELETE_PHOTO = "/photos/"; //{productType}/{detailsId}/{id}/{name}
export const DELETE_ALL_PHOTOS_BY_PRODUCT_ID = "/photos/"; //{productType}/{detailsId}/{id}
export const DELETE_ALL_PHOTOS_BY_DETAILS_ID = "/photos/"; //{productType}/{detailsId}

export const ADD_SELLER = "/sellers/";
export const GET_SELLER = "/sellers/"; //{id}
export const UPDATE_SELLER = "/sellers/"; //{id}
export const DELETE_SELLER = "/sellers/"; //{id}
export const SEARCH_SELLER = "/sellers/search";

export const GET_ALL_SELLERS_INFO = "/verification/";
export const GET_SELLER_INFO = "/verification/"; //{id}
export const UPDATE_SELLER_INFO = "/verification/"; //{id}