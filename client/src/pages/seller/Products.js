import React, {useEffect} from 'react';
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchClothesBySellerId} from "../../redux/actions";
import ProductsList from "../../components/product/ProductsList";

const Products = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => dispatch(fetchClothesBySellerId(user.id)), []);

    return (
        <Container>
            <div className={"mt-3 fs-3 fw-bold"}>Ваши товары</div>
            <ProductsList/>
        </Container>
    );
};

export default Products;