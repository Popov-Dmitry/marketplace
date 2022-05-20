import React from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import shop from "../../assets/shop.png";
import CountControl from "../CountControl";
import {deleteWish, saveCart} from "../../redux/actions";
import favorite from "../../assets/heart.png";
import favoriteShaded from "../../assets/heart_shaded.png";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

const WishItem = ({wish, i}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userReducer = useSelector(state => state.userReducer);
    const photos = useSelector(state => state.photoReducer.photosNames);
    const cartItem = useSelector(state => state.cartReducer.info);
    const products = useSelector(state => state.productReducer.products);
    const sellers = useSelector(state => state.sellerReducer.sellers);

    return (
        <Card className={"mt-2"}>
            <Row>
                <Col md={2}>
                    {photos.hasOwnProperty(wish.productDetailsId) &&
                        <Image
                            src={process.env.REACT_APP_API_URL + "photos/" + wish.productType + "/" + wish.productDetailsId
                                + "/" + wish.productId + "/" + photos[wish.productDetailsId].photosNames[0]}
                            className={"ratio-3x4 text-black-50 cursor-pointer m-auto"}
                            onClick={() => history.push("/" + wish.productType + "/" +
                                wish.productDetailsId + "/" + wish.productId)}
                        />
                    }
                </Col>
                <Col style={{position: "relative"}}>
                    {products[i] &&
                        <div className={"mt-2"}>
                            <div>{products[i].title}</div>
                            <div className={"text-black-50"}>
                                <span className={"text-lowercase"}>цвет {products[i].clothes[0].color},</span>
                                <span> размер {products[i].clothes[0].size}</span>
                            </div>
                        </div>
                    }
                    {sellers[i] &&
                        <div className={"mb-2"} style={{position: "absolute", bottom: "0px"}}>
                            <Image src={shop} height={"24px"} width={"24px"}/>
                            <span className={"ms-1"}>{sellers[i].shopName}</span>
                        </div>
                    }
                </Col>
                <Col md={4} style={{position: "relative"}}>
                    <div className={"mt-3 d-flex float-end me-4"}>
                        {cartItem.find(c =>
                            c.productDetailsId === wish.productDetailsId && c.productId === wish.productId) ?
                            <CountControl item={cartItem.find(c =>
                                c.productDetailsId === wish.productDetailsId && c.productId === wish.productId)}/>
                            :
                            <div>
                                <Button
                                    variant={"main"}
                                    onClick={() => userReducer.isAuth && userReducer.user.id &&
                                        dispatch(saveCart(userReducer.user.id, wish.productType, wish.productDetailsId, wish.productId, 1))}
                                >
                                    Добавить в корзину
                                </Button>
                            </div>
                        }
                    </div>
                    <Button
                        style={{position: "absolute", bottom: "0px", right: "0px"}}
                        variant={"light"}
                        size={"lg"}
                        className={"me-4 mb-2"}
                        onClick={() => dispatch(deleteWish(wish.id))}
                    >
                        <Image
                            src={typeof wish == "undefined" ? favorite : favoriteShaded}
                            width="30px"
                            height="30px"
                            className={"black-to-main"}
                        />
                    </Button>
                </Col>
            </Row>
        </Card>
    );
};

export default WishItem;