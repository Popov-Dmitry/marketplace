import React from 'react';
import {useSelector} from "react-redux";
import {Row} from "react-bootstrap";
import ProductItem from "./ProductItem";

const ProductsList = () => {
    const clothes = useSelector(state => state.clothesReducer.clothes);

    return (
        <Row className={"d-flex"}>
            {clothes.map(product =>
            <ProductItem key={product.id} product={product}/>
            )}
        </Row>
    );
};

export default ProductsList;