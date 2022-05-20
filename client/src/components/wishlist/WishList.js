import React from 'react';
import WishItem from "./WishItem";
import {useSelector} from "react-redux";

const WishList = () => {
    const wishlist = useSelector(state => state.wishlistReducer.wishlist);

    return (
        <div>
            {typeof wishlist != "undefined" && wishlist.map((wish, i) =>
                <WishItem key={wish.id} wish={wish} i={i}/>
            )}
        </div>
    );
};

export default WishList;