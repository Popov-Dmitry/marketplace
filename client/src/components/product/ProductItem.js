import React, {useEffect, useMemo, useState} from 'react';
import {Card, Col, Spinner} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchPhotosNames} from "../../redux/actions";
import {useHistory} from "react-router-dom";
import {CLOTHES_ROUTE, SEARCH_ROUTE, SELLER_PRODUCTS_ROUTE} from "../../utils/consts";
import {getColorsByDetails, getSizesByDetails} from "../../utils/productUtils";
import {CUSTOMER, SELLER} from "../../utils/roles";
import ChooseEdit from "../modals/ChooseEdit";

const ProductItem = ({product}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userReducer = useSelector(state => state.userReducer);
    const photos = useSelector(state => state.photoReducer.photosNames);
    const colors = useMemo(() => getColorsByDetails(product.clothes), [product]);
    const sizes = useMemo(() => getSizesByDetails(product.clothes), [product]);
    const [editProductVisible, setEditProductVisible] = useState(false);

    useEffect(() => dispatch(fetchPhotosNames("CLOTHES", product.id, product.clothes[0].id)), []);

    const onItemClick = () => {
        if (!userReducer.isAuth || userReducer.userRole === CUSTOMER) {
            history.push(CLOTHES_ROUTE + "/" + product.id + "/" + product.clothes[0].id);
        }
        if (userReducer.isAuth && userReducer.userRole === SELLER && history.location.pathname === SELLER_PRODUCTS_ROUTE) {
            setEditProductVisible(true);
        }
    };

    return (
        <Col md={history.location.pathname === SEARCH_ROUTE ? 4 : 3} className={"d-flex mt-1"}>
            <Card
                className={"cursor-pointer"}
                onClick={onItemClick}
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
                <div>
                    {product.clothes[0].price ?
                        <div className={"d-flex"}>
                            <div className={"ms-2 fs-5 fw-bold"}>{product.clothes[0].price} &#x20bd;</div>
                            <div className={"ms-2 mt-1 opacity-75 fw-bold"}><s>{product.clothes[0].regularPrice} &#x20bd;</s></div>
                        </div>
                        :
                        <div className={"ms-2 fs-5 fw-bold"}>{product.clothes[0].regularPrice} &#x20bd;</div>
                    }

                </div>

                <div className={"ms-2 fs-5"}>{product.title.length < 50 ? product.title : product.title.substring(0, 47) + "..."}</div>
                <div className={"ms-2 mb-1"}>{colors.map(color =>
                    <span key={color} className={"product-item-param p-1 me-1"}>{color}</span>)}
                </div>
                <div className={"ms-2 mb-2"}>{sizes.map(size =>
                    <span key={size} className={"product-item-param p-1 me-1"}>{size}</span>)}
                </div>
            </Card>
            <ChooseEdit show={editProductVisible} onHide={setEditProductVisible} product={product}/>
        </Col>
    );
};

export default ProductItem;