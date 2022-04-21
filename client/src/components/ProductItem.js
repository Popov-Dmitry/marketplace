import React, {useEffect, useMemo} from 'react';
import {Card, Col, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotosNames} from "../redux/actions";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE} from "../utils/consts";
import {getColorsByDetails, getSizesByDetails} from "../utils/productUtils";

const ProductItem = ({product}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const photos = useSelector(state => state.photoReducer.photosNames);
    const colors = useMemo(() => getColorsByDetails(product.clothes), [product]);
    const sizes = useMemo(() => getSizesByDetails(product.clothes), [product]);

    useEffect(() => dispatch(fetchPhotosNames("CLOTHES", product.id, product.clothes[0].id)), []);

    return (
        <Col md={4}>
            <Card
                className={"product-item"}
                onClick={() => history.push(CLOTHES_ROUTE + "/" + product.id + "/" + product.clothes[0].id)}
            >
                {photos[product.id] ?
                    <Card.Img
                        src={process.env.REACT_APP_API_URL + "photos/CLOTHES/" + product.id + "/"
                            + product.clothes[0].id + "/" + photos[product.id].photosNames[0]}
                        className={"text-center ratio-3x4"}
                        alt={product.title}
                        />
                    :
                    <div className={"text-center"} style={{height: "250px"}}>
                        <Spinner className={"spinner-main"} animation="border"/>
                    </div>
                }
                <div className={"ms-2 fs-5 fw-bold"}>{product.clothes[0].price} &#x20bd;</div>
                <div className={"ms-2 fs-5"}>{product.title}</div>
                <div className={"ms-2 mb-1"}>{colors.map(color =>
                    <span key={color} className={"product-item-param p-1 me-1"}>{color}</span>)}
                </div>
                <div className={"ms-2 mb-2"}>{sizes.map(size =>
                    <span key={size} className={"product-item-param p-1 me-1"}>{size}</span>)}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;