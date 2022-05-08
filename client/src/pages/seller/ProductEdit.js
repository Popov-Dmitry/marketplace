import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import ClothesProductDetailsEdit from "../../components/product/ClothesProductDetailsEdit";
import {useHistory} from "react-router-dom";
import {fetchAllClothesByClothesDetailsId} from "../../http/clothesProductApi";
import {showAlert, fetchPhotosNames} from "../../redux/actions";
import {useDispatch} from "react-redux";
import ClothesProductEdit from "../../components/product/ClothesProductEdit";

const ProductEdit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [clothes, setClothes] = useState();
    const [variant, setVariant] = useState("");

    useEffect(async () => {
        const pathArr = history.location.pathname.split("/");
        const detailsId = pathArr[3];
        if (detailsId) {
            try {
                let c;
                if (pathArr[4] === "edit") {
                    c = await fetchAllClothesByClothesDetailsId(detailsId);
                    setVariant("detailsEdit");
                    setClothes(c);
                }
                if (pathArr[5] === "edit") {
                    c = await fetchAllClothesByClothesDetailsId(detailsId);
                    setVariant("productEdit");
                    setClothes(c.clothes.find(item => item.id == pathArr[4]));
                    dispatch(fetchPhotosNames("CLOTHES", detailsId, pathArr[4]));
                }
                if (pathArr[4] === "new") {
                    setVariant("newProduct");
                }
            } catch (e) {
                console.log(e);
                dispatch(showAlert("danger", "Что-то пошло не так"));
            }
        }
    }, []);

    return (
        <Container>
            {clothes && variant === "detailsEdit" &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Общая информация</div>
                    <ClothesProductDetailsEdit product={clothes}/>
                </div>
            }
            {clothes && variant === "productEdit" &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Информация о варианте товара</div>
                    <ClothesProductEdit clothes={clothes}/>
                </div>
            }
            {variant === "newProduct" &&
                <div>
                    <div className={"mt-4 fs-4 fw-bold"}>Информация о варианте товара</div>
                    <ClothesProductEdit/>
                </div>
            }
        </Container>
    );
};

export default ProductEdit;