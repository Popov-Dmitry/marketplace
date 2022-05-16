import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchAllClothesByClothesDetailsId} from "../../http/clothesProductApi";
import {showAlert} from "../../redux/actions";
import {fetchPhotosNames} from "../../http/photoApi";
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import ProductDetails from "../../components/product/ProductDetails";
import ProductInfo from "../../components/product/ProductInfo";

let detailsId;
let id;

const Product = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [clothes, setClothes] = useState({clothes: []});
    const [photos, setPhotos] = useState([]);

    useEffect(async () => {
        detailsId = history.location.pathname.split("/")[2];
        id = history.location.pathname.split("/")[3];
        if (id && detailsId){
            try {
                const c = await fetchAllClothesByClothesDetailsId(detailsId);
                setClothes(c);
                const p = await fetchPhotosNames("CLOTHES", detailsId, id);
                setPhotos(p);
            }
            catch (e) {
                console.log(e);
                dispatch(showAlert("danger", "Что-то пошло не так"));
            }
        }
    }, [history.location]);

    const changePhoto = (event) => {
        const images = document.getElementById("images").children;
        for (let image of images) {
            image.classList.remove("product-item-param-active-border")
        }
        event.target.classList.add("product-item-param-active-border");
        document.getElementById("main-image").src = event.target.src;
    };

    return (
        <Container>
            {clothes && photos.length > 0 ?
                <div>
                    <Row className={"mt-4"}>
                        <Col id={"images"} md={1} className={"m-auto"}>
                            {photos.map((p, i) =>
                                <Image
                                    key={p}
                                    src={process.env.REACT_APP_API_URL + "photos/CLOTHES/" + detailsId + "/" + id + "/" + p}
                                    alt={"Изображение не найдено"}
                                    className={`ratio-3x4 mb-2 ${i === 0 && "product-item-param-active-border"}`}
                                    onMouseEnter={changePhoto}
                                />
                            )}
                        </Col>
                        <Col md={5}>
                            <Image
                                id={"main-image"}
                                src={process.env.REACT_APP_API_URL + "photos/CLOTHES/" + detailsId + "/" + id + "/" + photos[0]}
                                alt={clothes.title}
                                className={"ratio-3x4"}
                            />
                        </Col>
                        <Col md={1}/>
                        <Col md={5}>
                            <ProductInfo clothes={clothes}/>
                        </Col>
                    </Row>
                    <Row className={"mt-4"}>
                        <ProductDetails clothes={clothes}/>
                    </Row>
                </div>
                :
                <div className={"text-center mt-5"}>
                    <Spinner className={"spinner-main"} animation={"border"}/>
                </div>
            }
        </Container>
    );
};

export default Product;