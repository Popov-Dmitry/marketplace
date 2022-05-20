import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    clearPhotoStore,
    clearProducts, clearSellers, fetchPhotosNames, fetchProduct, fetchSeller
} from "../../redux/actions";
import WishList from "../../components/wishlist/WishList";

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlistReducer.wishlist);

    // useEffect(() => dispatch(fetchWishlist(CUSTOMER, user.id)), []);

    useEffect(() => {
        dispatch(clearPhotoStore());
        dispatch(clearProducts());
        dispatch(clearSellers());
        for (let wish of wishlist) {
            dispatch(fetchPhotosNames(wish.productType, wish.productDetailsId, wish.productId));
            dispatch(fetchProduct(wish.productType, wish.productDetailsId, wish.productId));
            dispatch(fetchSeller(wish.sellerId));
        }

    }, [wishlist]);

    return (
        <Container>
            <WishList/>
        </Container>
    );
};

export default Wishlist;